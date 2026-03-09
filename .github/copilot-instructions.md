# Copilot Instructions

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- Forms with `react-hook-form`
- Runtime validation with `zod`

## Coding Preferences
- Keep components small and strongly typed.
- Create components as named exports with arrow functions and an explicit return block, for example: `export const MyApp = () => { return (...) }`.
- Use async arrow function expressions for async component-related logic (for example submit handlers and async callbacks).
- When a component becomes large, split UI into a separate component file and move state/behavior into a custom hook to keep files readable.
- Prefer reusable utilities over repeated inline logic.
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes.
- Keep validation logic in Zod schemas and avoid ad-hoc string checks.
- Use accessible form markup with labels and clear error messages.

## Project Conventions
- Put shared helpers in `src/lib`.
- Prefer function components and hooks.
- Avoid adding new dependencies unless they clearly reduce complexity.
- Keep examples production-minded: no dead demo code.
