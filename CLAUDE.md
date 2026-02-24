# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Marvin Ronaldo Martínez Marroquín, a Science and Systems Engineer. This project is currently in migration from a React application to Next.js 16 with App Router.

**Tech Stack:**
- Next.js 16.0.0 (App Router)
- React 19.2.0
- TypeScript 5
- Tailwind CSS v4 (using new @tailwindcss/postcss plugin)
- ESLint 9 (flat config)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Migration Context
The repository is transitioning from a legacy React app to Next.js. Git status shows deleted files from the old structure (src/, public/) and new Next.js files (app/, new public/ assets). The branch `main-new-portfolio` contains the Next.js migration work, while `master` is the main production branch.

### Current Structure
- **app/**: Next.js App Router directory
  - `layout.tsx`: Root layout with Geist Sans and Geist Mono fonts from Google Fonts
  - `page.tsx`: Home page component
  - `globals.css`: Global styles using Tailwind CSS v4 inline theme syntax
- **public/**: Static assets (SVG icons)
- **tsconfig.json**: TypeScript configuration with path alias `@/*` mapping to root

### Styling System
Uses Tailwind CSS v4 with the new architecture:
- PostCSS plugin: `@tailwindcss/postcss` (configured in `postcss.config.mjs`)
- Theme configuration uses new `@theme inline` directive in `globals.css`
- CSS variables for background/foreground colors with dark mode support
- Custom font variables defined via Next.js font optimization

### ESLint Configuration
Uses ESLint 9 flat config (`eslint.config.mjs`) with Next.js presets:
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- Custom global ignores for `.next/`, `out/`, `build/`, and `next-env.d.ts`

## Important Notes

### TypeScript Configuration
- Path alias `@/*` maps to project root (e.g., `@/app/layout.tsx`)
- JSX mode: `react-jsx` (not `preserve` as is typical with Next.js - this may need review)
- Target: ES2017 with moduleResolution: `bundler`

### Legacy Code References
If referencing the previous React implementation, check deleted files in git history:
- Old components: `src/components/` (Banner, Card, NavBar, Technologies)
- Old assets: `src/assets/` (fonts, images, lottie animations)
- Old styling: Used custom Titillium Web fonts and specific imagery (astronaut/space theme)

Recent commits indicate work on a technologies showcase and card-based layout.

### Branch Strategy
- Current work branch: `main-new-portfolio`
- Main production branch: `master`
- When creating PRs, target the `master` branch
