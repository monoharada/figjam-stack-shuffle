# Technology Stack

## Architecture
### System Design
- **Type**: Figma/Figjam Plugin
- **Architecture Pattern**: Event-driven plugin architecture
- **Execution Context**: Figma sandbox environment
- **Communication**: PostMessage API between UI and sandbox

### Plugin Architecture
```
UI Layer (iframe)
    ↕️ PostMessage API
Sandbox Layer (main thread)
    ↕️ Figma Plugin API
Figjam Canvas
```

## Frontend
### Core Technologies
- **Language**: TypeScript
- **UI Framework**: HTML/CSS/JavaScript (Figma UI library recommended)
- **Build Tool**: webpack/esbuild (Figma plugin bundler)
- **Type Checking**: TypeScript strict mode

### Figma-specific Libraries
- **Figma Plugin API**: Latest version
- **Figma Plugin DS**: Design system for plugin UI
- **Figma Plugin Types**: @figma/plugin-typings

## Development Environment
### Required Tools
- **Node.js**: v18+ (LTS recommended)
- **Package Manager**: npm/yarn/pnpm
- **Code Editor**: VS Code with Figma Plugin extension
- **Figma Desktop**: Latest version for local testing

### Development Setup
```bash
# Initialize Figma plugin
npm init @figma/plugin

# Install dependencies
npm install

# Build plugin
npm run build

# Watch mode for development
npm run watch
```

## Common Commands
```bash
# Development
npm run watch          # Watch for changes and rebuild
npm run build          # Build plugin for production
npm run type-check     # Type checking
npm run lint           # Linting

# Testing
npm test               # Run tests
npm run test:watch     # Watch mode for tests

# Figma Plugin
npm run manifest       # Update manifest.json
npm run publish        # Publish to Figma Community
```

## Configuration Files
### manifest.json
```json
{
  "name": "Random Sticky Note Positioner",
  "id": "plugin-id",
  "api": "1.0.0",
  "main": "dist/code.js",
  "ui": "dist/ui.html",
  "editorType": ["figjam"],
  "permissions": []
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "es2020",
    "lib": ["es2020", "dom"],
    "strict": true,
    "typeRoots": ["./node_modules/@types", "./node_modules/@figma"]
  }
}
```

## API Integration
### Figma Plugin API
- **Selection API**: figma.currentPage.selection
- **Node Manipulation**: figma.createNode, node.x, node.y
- **Viewport API**: figma.viewport methods
- **UI Communication**: figma.ui.postMessage

### Key API Methods
```typescript
// Selection handling
figma.currentPage.selection

// Node positioning
node.x = newX
node.y = newY

// UI communication
figma.ui.postMessage(data)
figma.ui.on('message', handler)
```

## Security Considerations
- **Sandbox Execution**: Plugin runs in isolated sandbox
- **CSP Compliance**: Content Security Policy restrictions
- **No External Requests**: Network requests blocked in sandbox
- **Data Privacy**: No user data leaves Figma environment

## Performance Guidelines
- **Node Limits**: Handle large selections efficiently
- **Batch Operations**: Group node updates
- **Async Operations**: Use async/await for heavy operations
- **Memory Management**: Clean up references to prevent leaks