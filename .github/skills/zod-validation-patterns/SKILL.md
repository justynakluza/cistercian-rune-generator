---
name: zod-validation-patterns
description: "Use when creating, extending, or debugging Zod schemas for form validation, payload parsing, and safe runtime checks in React apps."
---

# Zod Validation Patterns

## Goals
- Ensure runtime data safety.
- Keep validation rules centralized and reusable.

## Checklist
- Define schemas close to domain logic, not inline in JSX.
- Use `safeParse()` for non-throwing validation flows.
- Map `error.issues` to user-friendly messages.
- Use `z.infer<typeof schema>` to keep types in sync.
- Prefer schema composition (`extend`, `pick`, `omit`) for reuse.
