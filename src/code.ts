// Figma automatically loads the UI file specified in manifest.json
// The __html__ variable is automatically populated by Figma
figma.showUI(__html__, { width: 300, height: 280 });

// Log initial state
console.log('Plugin started. Initial selection:', figma.currentPage.selection.length);

// Send initial selection count to UI
const sendSelectionCount = () => {
  const count = figma.currentPage.selection.length;
  console.log('Sending selection count:', count);
  figma.ui.postMessage({
    type: 'selection-changed',
    count: count
  });
};

// Send immediately and after delay to ensure UI is ready
sendSelectionCount();
setTimeout(sendSelectionCount, 500);

// Utility function to validate selection
function validateSelection(minCount: number = 2): boolean {
  const count = figma.currentPage.selection.length;
  if (count < minCount) {
    const message = `Please select at least ${minCount} element${minCount > 1 ? 's' : ''}`;
    figma.notify(message);
    figma.ui.postMessage({ type: 'error', message });
    return false;
  }
  return true;
}

// Message handler
interface PluginMessage {
  type: string;
  data?: any;
}

figma.ui.onmessage = (msg: PluginMessage) => {
  console.log('Received message from UI:', msg);

  switch (msg.type) {
    case 'ui-ready':
      console.log('UI is ready');
      sendSelectionCount();
      break;

    case 'stack-elements':
      handleStackElements();
      break;

    case 'shuffle-order':
      handleShuffleOrder();
      break;

  }
};

// Stack all selected elements at the same position
function handleStackElements() {
  console.log('Stack elements called');

  if (!validateSelection()) return;

  const selection = figma.currentPage.selection;
  const bounds = calculateBounds(selection);
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height / 2;

  console.log('Stacking elements to center:', centerX, centerY);

  // Move all elements to center
  selection.forEach(node => {
    if ('x' in node && 'y' in node && 'width' in node && 'height' in node) {
      node.x = centerX - node.width / 2;
      node.y = centerY - node.height / 2;
    }
  });

  figma.notify(`${selection.length} elements stacked at center position`);
  figma.ui.postMessage({
    type: 'stack-complete',
    count: selection.length,
    position: { x: centerX, y: centerY }
  });
}

// Shuffle the z-order (layer order) of selected elements
function handleShuffleOrder() {
  console.log('Shuffle order called');

  if (!validateSelection()) return;

  const selection = figma.currentPage.selection;

  // Group nodes by parent (can only shuffle nodes with same parent)
  const nodesByParent = new Map<BaseNode, SceneNode[]>();

  selection.forEach(node => {
    if (node.parent) {
      if (!nodesByParent.has(node.parent)) {
        nodesByParent.set(node.parent, []);
      }
      nodesByParent.get(node.parent)!.push(node);
    }
  });

  let shuffledCount = 0;

  // Shuffle each group
  nodesByParent.forEach((nodes, parent) => {
    if (nodes.length < 2) return;

    // Fisher-Yates shuffle
    const shuffled = [...nodes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Apply new order by appending each node (moves to front)
    shuffled.forEach(node => {
      if ('appendChild' in parent && typeof parent.appendChild === 'function') {
        (parent as any).appendChild(node);
      }
    });

    shuffledCount += nodes.length;
  });

  figma.notify(`Shuffled z-order of ${shuffledCount} elements`);
  figma.ui.postMessage({
    type: 'shuffle-complete',
    count: shuffledCount
  });
}

// Calculate bounding box of selected nodes
function calculateBounds(nodes: readonly SceneNode[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  nodes.forEach(node => {
    if ('x' in node && 'y' in node && 'width' in node && 'height' in node) {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x + node.width);
      maxY = Math.max(maxY, node.y + node.height);
    }
  });

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

// Listen for selection changes
figma.on('selectionchange', () => {
  sendSelectionCount();
});