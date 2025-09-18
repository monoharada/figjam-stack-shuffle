// UI Script for Figma Plugin
console.log('UI Script loaded and executing');

let selectedCount = 0;
let shuffleCount = 0;
let stackCount = 0;

// Initialize function
function initialize() {
  console.log('UI: Initializing...');
  setupEventListeners();
  updateUI();

  // Send ready message to plugin
  console.log('UI: Sending ui-ready message to plugin');
  parent.postMessage({ pluginMessage: { type: 'ui-ready' } }, '*');
}

function setupEventListeners() {
  const stackBtn = document.getElementById('stack-btn') as HTMLButtonElement;
  const shuffleBtn = document.getElementById('shuffle-btn') as HTMLButtonElement;

  console.log('UI: Setting up event listeners', {
    stackBtn: !!stackBtn,
    shuffleBtn: !!shuffleBtn
  });

  stackBtn?.addEventListener('click', () => {
    console.log('UI: Stack button clicked');
    parent.postMessage({ pluginMessage: { type: 'stack-elements' } }, '*');
  });

  shuffleBtn?.addEventListener('click', () => {
    console.log('UI: Shuffle button clicked');
    parent.postMessage({ pluginMessage: { type: 'shuffle-order' } }, '*');
  });

}

function updateUI() {
  const statusEl = document.getElementById('selection-status') as HTMLElement;
  const hintEl = document.getElementById('selection-hint') as HTMLElement;
  const stackBtn = document.getElementById('stack-btn') as HTMLButtonElement;
  const shuffleBtn = document.getElementById('shuffle-btn') as HTMLButtonElement;

  if (!statusEl || !hintEl) {
    console.error('UI: Could not find status elements');
    return;
  }

  if (selectedCount === 0) {
    statusEl.textContent = 'No elements selected';
    statusEl.className = 'warning';
    hintEl.textContent = 'Please select elements in Figjam to continue';
    if (stackBtn) stackBtn.disabled = true;
    if (shuffleBtn) shuffleBtn.disabled = true;
  } else if (selectedCount === 1) {
    statusEl.textContent = '1 element selected';
    statusEl.className = 'warning';
    hintEl.textContent = 'Select at least 2 elements to stack or shuffle';
    if (stackBtn) stackBtn.disabled = true;
    if (shuffleBtn) shuffleBtn.disabled = true;
  } else {
    statusEl.textContent = `${selectedCount} elements selected`;
    statusEl.className = 'success';
    hintEl.textContent = 'Ready to stack and shuffle';
    if (stackBtn) stackBtn.disabled = false;
    if (shuffleBtn) shuffleBtn.disabled = false;
  }
}

window.onmessage = (event) => {
  const message = event.data.pluginMessage;
  console.log('UI: Received message from plugin', message);

  if (!message) return;

  if (message.type === 'selection-changed') {
    selectedCount = message.count;
    updateUI();
  } else if (message.type === 'stack-complete') {
    stackCount++;
    updateActionCount('stack', stackCount, message.count);
  } else if (message.type === 'shuffle-complete') {
    shuffleCount++;
    updateActionCount('shuffle', shuffleCount, message.count);
  } else if (message.type === 'error') {
    // Keep error notification for now
    showNotification(`❌ ${message.message}`, 'error');
  }
};

function showNotification(message: string, type: 'success' | 'error' = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function updateActionCount(action: 'stack' | 'shuffle', count: number, elementCount: number) {
  const counterId = `${action}-count`;
  let counterEl = document.getElementById(counterId);

  if (!counterEl) {
    counterEl = document.createElement('div');
    counterEl.id = counterId;
    counterEl.className = 'action-count';
    const actionsSection = document.getElementById('actions');
    if (actionsSection) {
      actionsSection.appendChild(counterEl);
    }
  }

  const actionText = action === 'stack' ? 'Stacked' : 'Shuffled';
  counterEl.textContent = `${actionText} ${count} time${count > 1 ? 's' : ''} (${elementCount} elements)`;

  // Fade out after 3 seconds
  counterEl.style.opacity = '1';
  setTimeout(() => {
    if (counterEl) counterEl.style.opacity = '0.5';
  }, 3000);
}

// Start initialization
// Check if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  // DOM is already ready
  initialize();
}