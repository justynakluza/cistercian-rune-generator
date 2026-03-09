---
name: react-hook-form-basics
description: "Use when building or refactoring form components with react-hook-form, including register, handleSubmit, formState, setError, and typed field handling."
---

# React Hook Form Basics

## Goals
- Build typed forms with minimal re-renders.
- Keep validation and submit paths predictable.

## Checklist
- Define a dedicated TypeScript type for form values.
- Initialize `useForm<T>()` with explicit `defaultValues`.
- Use `register()` for inputs and `handleSubmit()` for submission.
- Render errors from `formState.errors` near each field.
- Use `setError()` for server-side or schema validation failures.
