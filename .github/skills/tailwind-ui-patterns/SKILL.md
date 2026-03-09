---
name: tailwind-ui-patterns
description: "Use when implementing UI styles with Tailwind v4, especially responsive layouts, state variants, and conditional class composition with clsx and tailwind-merge."
---

# Tailwind UI Patterns

## Goals
- Keep utility classes readable and conflict-free.
- Build responsive, accessible interfaces quickly.

## Checklist
- Prefer semantic layout wrappers (`main`, `section`, `form`).
- Keep class lists grouped by layout, spacing, typography, and state.
- Use `cn()` for conditionals and class conflict resolution.
- Avoid duplicated utility strings across components.
- Ensure keyboard focus states are clearly visible.
