# Copilot Instructions

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- Forms with `react-hook-form`
- Runtime validation with `zod`

## Coding Preferences
- Keep components small and strongly typed.
- In TypeScript interfaces and object type declarations, place optional fields (`?`) at the bottom of the type.
- Create components as named exports with arrow functions and an explicit return block, for example: `export const MyApp = () => { return (...) }`.
- Use async arrow function expressions for async component-related logic (for example submit handlers and async callbacks).
- When a component approaches or exceeds 180 lines, split UI into separate component files and move state/behavior into a custom hook to keep files readable.
- Prefer reusable utilities over repeated inline logic.
- Use `cn()` from `src/shared/utils/class-names.ts` for conditional Tailwind classes.
- Keep validation logic in Zod schemas and avoid ad-hoc string checks.
- Use accessible form markup with labels and clear error messages.

## Project Conventions
- Put shared helpers in `src/shared`.
- Organize features by domain under `src/features/<feature-name>/` with `components`, `hooks`, `utils`, and `types.ts`.
- Prefer folder-barrel imports (for example `./hooks`) instead of explicit `index.ts` import paths.
- Use kebab-case for all file and folder names. Component names and exports inside files remain PascalCase.
- Prefer function components and hooks.
- Avoid adding new dependencies unless they clearly reduce complexity.
- Keep examples production-minded: no dead demo code.
