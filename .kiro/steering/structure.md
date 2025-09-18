# Project Structure

## Root Directory Organization
```
figjam_random_sticky_note/
├── .kiro/                 # Kiro spec-driven development
│   ├── steering/          # Project steering documents
│   └── specs/             # Feature specifications
├── .claude/               # Claude AI configuration
│   └── commands/          # Custom slash commands
├── src/                   # Source code
│   ├── code.ts            # Main plugin logic (sandbox)
│   ├── ui.ts              # UI logic (iframe)
│   └── types/             # TypeScript type definitions
├── dist/                  # Build output (gitignored)
│   ├── code.js            # Compiled plugin code
│   └── ui.html            # Compiled UI
├── ui/                    # UI resources
│   ├── index.html         # Plugin UI HTML
│   └── styles.css         # Plugin UI styles
├── manifest.json          # Figma plugin manifest
├── package.json           # Node.js dependencies
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Build configuration
├── CLAUDE.md              # Claude AI project instructions
└── README.md              # Project documentation
```

## Subdirectory Structures

### Source Code (`src/`)
```
src/
├── code.ts                # Main plugin entry point
├── ui.ts                  # UI controller logic
├── types/                 # Type definitions
│   ├── nodes.ts           # Figjam node types
│   └── messages.ts        # UI message types
├── utils/                 # Utility functions
│   ├── positioning.ts     # Position calculation logic
│   ├── randomizer.ts      # Randomization algorithms
│   └── selection.ts       # Selection handling
└── constants/             # Configuration constants
    └── config.ts          # Plugin configuration
```

### UI Directory (`ui/`)
```
ui/
├── index.html             # Main UI structure
├── styles.css             # UI styling
└── components/            # UI components (if needed)
    ├── button.html        # Reusable button component
    └── panel.html         # Panel layouts
```

### Kiro Specifications (`.kiro/`)
```
.kiro/
├── steering/              # Project guidance
│   ├── product.md         # Product overview
│   ├── tech.md            # Technology decisions
│   └── structure.md       # This file
└── specs/                 # Feature specifications
    └── [feature-name]/    # Per-feature specs
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

## Code Organization Patterns

### Separation of Concerns
- **code.ts**: Plugin logic, Figma API interactions
- **ui.ts**: User interface logic, event handling
- **utils/**: Pure functions, no side effects
- **types/**: TypeScript interfaces and types

### Communication Pattern
```typescript
// From UI to Plugin
parent.postMessage({
  pluginMessage: {
    type: 'action-type',
    data: payload
  }
}, '*')

// From Plugin to UI
figma.ui.postMessage({
  type: 'response-type',
  data: result
})
```

### Module Structure
```typescript
// Each module exports specific functionality
export interface ModuleInterface {
  // Type definitions
}

export class Module {
  // Class implementation
}

export function utilityFunction() {
  // Utility implementation
}
```

## File Naming Conventions

### TypeScript Files
- **Components**: PascalCase (e.g., `RandomizerPanel.ts`)
- **Utilities**: camelCase (e.g., `randomizer.ts`)
- **Types**: camelCase with `.types.ts` suffix (e.g., `node.types.ts`)
- **Constants**: UPPER_SNAKE_CASE in files (e.g., `MAX_NODES`)

### Asset Files
- **HTML**: kebab-case (e.g., `main-panel.html`)
- **CSS**: kebab-case (e.g., `button-styles.css`)
- **Images**: kebab-case (e.g., `icon-shuffle.svg`)

### Test Files
- **Unit Tests**: `[name].test.ts`
- **Integration Tests**: `[name].integration.test.ts`

## Import Organization

### Import Order
```typescript
// 1. External dependencies
import { Something } from 'external-package'

// 2. Figma API
import { figma } from '@figma/plugin-api'

// 3. Types
import type { NodeType } from './types/nodes'

// 4. Utils and helpers
import { randomize } from './utils/randomizer'

// 5. Components
import { MainPanel } from './components/MainPanel'

// 6. Constants
import { CONFIG } from './constants/config'
```

### Path Aliases (tsconfig)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

## Key Architectural Principles

### 1. Sandbox Isolation
- Plugin code runs in sandbox, UI in iframe
- Communication only through PostMessage API
- No direct DOM access from plugin code

### 2. Type Safety
- Strict TypeScript configuration
- All API communications typed
- Runtime validation for external data

### 3. Performance First
- Batch Figma API operations
- Minimize selection traversals
- Async operations for heavy processing

### 4. Error Handling
```typescript
try {
  // Operation
} catch (error) {
  figma.notify('Error: ' + error.message)
  console.error(error)
}
```

### 5. State Management
- UI state managed in ui.ts
- Plugin state managed in code.ts
- State sync through messages

### 6. Testability
- Pure functions in utils/
- Dependency injection for API calls
- Mock-friendly architecture

## Build Pipeline

### Development Build
```
src/*.ts → TypeScript → Webpack → dist/
ui/*.html → HTML processing → dist/
```

### Production Build
```
src/*.ts → TypeScript → Minification → dist/
ui/*.html → HTML minification → dist/
manifest.json → Validation → dist/
```

## Git Workflow
- **Main Branch**: `main` - stable releases
- **Development**: `develop` - ongoing development
- **Features**: `feature/[name]` - new features
- **Fixes**: `fix/[issue]` - bug fixes
- **Releases**: `release/[version]` - release preparation