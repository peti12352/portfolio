# Personal Portfolio

A modern, performant, and maintainable personal portfolio site built with TypeScript.

## Features

- 🎨 Dark theme
- ⚡ Optimized no-framework design (95 Lighthouse score)
- 🔒 Secure email protection
- 🛠 Type-safe content management

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Content Management

Update your content in `src/content/index.ts`:

```typescript
content.personal = {
  name: "Your Name",
  title: "Your Title",
  // ...
};
```

Add images to `assets/` and reference them in your content.

## Development

```bash
# Type checking
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

## Deployment

Push to main branch to trigger automatic build and deployment via GitHub Actions.

## Project Structure

```
├── src/
│   ├── content/     # Content management
│   ├── styles/      # CSS styles
│   └── scripts/     # TypeScript files
├── assets/          # Images and icons
├── templates/       # HTML templates
└── scripts/         # Build scripts
```

## Performance

- Preloaded critical assets
- Optimized images
- Minimal CSS/JS
- Efficient animations

## License

MIT

## Author

Peter Tallosy - [GitHub](https://github.com/peti12352) - [LinkedIn](https://www.linkedin.com/in/peter-tallosy/)

## Acknowledgments

- [Andrej Karpathy](https://github.com/karpathy)
- [TypeScript](https://www.typescriptlang.org/)
