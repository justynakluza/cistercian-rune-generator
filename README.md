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
- `src/components/` for UI components
- `src/hooks/` for component logic/state
- `src/lib/` for shared utilities
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
- UI in component files (for example `src/components/NumericFormView.tsx`)
- State and behavior in custom hooks (for example `src/hooks/useNumericForm.ts`)

## Conventions
- Use named-exported arrow components with explicit return blocks.
- Use async arrow functions for async component-related logic.
- Keep validation in Zod schemas.
- Use `cn()` from `src/lib/utils.ts` for conditional classes.
