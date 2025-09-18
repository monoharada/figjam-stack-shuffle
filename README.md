# 🔀 Stack & Shuffle - FigJam Plugin

A simple and effective FigJam plugin that helps you organize elements by stacking them at the same position and shuffling their layer order like a deck of cards.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **📚 Stack Elements**: Stack all selected elements (sticky notes, shapes, connectors) at their center position
- **🔀 Shuffle Order**: Randomly shuffle the z-order (layer order) of stacked elements, like shuffling a deck of cards
- **🎯 Simple & Fast**: Minimalist interface with just two main actions
- **📊 Usage Counter**: Subtle display shows how many times you've stacked or shuffled

## 🚀 Installation

### From Figma Community (Coming Soon)
The easiest way to use this plugin is to install it from the Figma Community.

### Development Setup

1. Clone this repository:
```bash
git clone https://github.com/yourusername/figjam-stack-shuffle.git
cd figjam-stack-shuffle
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

4. In Figma:
   - Open a FigJam file
   - Go to Plugins → Development → Import plugin from manifest
   - Select the `manifest.json` file from this project

## 🎮 Usage

1. **Select Elements**: Select 2 or more elements in your FigJam board (sticky notes, shapes, connectors, etc.)

2. **Stack Elements**: Click the "📚 Stack Elements" button to move all selected items to the same center position

3. **Shuffle Order**: Click the "🔀 Shuffle Order" button to randomize the layer order of the stacked elements

The plugin shows a subtle counter below the buttons indicating how many times you've performed each action.

## 🛠️ Development

### Project Structure
```
figjam-stack-shuffle/
├── src/
│   ├── code.ts      # Main plugin logic
│   └── ui.ts        # UI interaction logic
├── ui/
│   └── index.html   # Plugin UI
├── dist/            # Built files
├── manifest.json    # Figma plugin manifest
└── build.js         # Build script
```

### Available Scripts

- `npm run build` - Build the plugin for production
- `npm run watch` - Watch for changes and rebuild automatically
- `npm run dev` - Development build with watch mode

### Technical Details

- Built with TypeScript and esbuild
- Uses Figma Plugin API for FigJam
- Fisher-Yates algorithm for true random shuffling
- Minimal dependencies for fast performance

## 🎯 Use Cases

- **Brainstorming**: Stack ideas and randomly reveal them one by one
- **Prioritization**: Shuffle items to avoid bias in selection
- **Games & Activities**: Create card-like interactions in FigJam
- **Organization**: Quickly consolidate scattered elements to one location

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

MIT License - feel free to use this plugin in your projects!

## 🙏 Acknowledgments

Built with ❤️ for the FigJam community.

---

**Author**: [Your Name]
**Contact**: [Your Email/GitHub]