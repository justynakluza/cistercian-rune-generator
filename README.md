# cistercian-rune-generator

Frontend starter configured for your current stack and coding conventions.

## Tech Stack
- React 19
- TypeScript
- Vite 7
- Tailwind CSS v4 via `@tailwindcss/vite`
- `react-hook-form` for forms
- `zod` for runtime validation
- `clsx` + `tailwind-merge` (`cn()` helper) for conditional Tailwind classes

## Project Structure
- `src/features/runes/components/` for rune UI components
- `src/features/runes/hooks/` for rune logic/state
- `src/shared/utils/` for shared utilities
- `.github/copilot-instructions.md` for workspace AI coding instructions
- `.github/agents/` for custom agents
- `.github/skills/` for reusable skill instructions

## Scripts
- `npm run dev` starts Vite dev server
- `npm run build` runs TypeScript build and Vite production build
- `npm run preview` serves production build locally
- `npm run lint` runs ESLint

## Current UI Pattern
This repo follows a readability-first split for larger components:
- UI in feature component files (for example `src/features/runes/components/rune-display-view.tsx`)
- State and behavior in feature hooks (for example `src/features/runes/hooks/use-rune-display-form.ts`)

## Conventions
- Use named-exported arrow components with explicit return blocks.
- Use async arrow functions for async component-related logic.
- Keep validation in Zod schemas.
- Use `cn()` from `src/shared/utils/class-names.ts` for conditional classes.
