# Contributing Guide

Thank you for contributing to the project.

This document describes the engineering conventions used throughout the codebase.

The objective is not to enforce strict rules, but to maintain a consistent architecture as the project evolves.

If you're new to the project, we recommend reading `ARCHITECTURE.md` before contributing.

---

# Engineering Philosophy

When adding new code, prioritize:

- Ownership over implementation
- Simplicity over premature abstraction
- Cohesion over reuse
- Clear responsibilities over technical patterns

Every architectural decision should answer one question:

> **Who owns this responsibility?**

---

# Creating a New Feature

Every business capability starts as a feature.

Example:

```text
features/

statistics/

profile/

achievements/
```

Keep new features intentionally simple.

Example:

```text
statistics/

statistics.controller.js

statistics.listeners.js

index.js
```

Only introduce additional folders when responsibilities naturally increase.

---

# Complexity Creates Structure

Do not create folders simply because other features have them.

For example:

```text
controller/

services/

state/

events/

helpers/

ui/
```

should only exist when they provide meaningful organization.

Features should grow organically, not artificially just to follow industry standards.

---

# Deciding Where Code Belongs

Before creating a new module, ask the following questions.

## Does one feature own it?

If yes:

Keep it inside that feature.

Example:

```text
features/

survivor-streak/
```

---

## Is it shared by multiple related features?

If yes:

Place it inside the appropriate shared domain.

Example:

```text
shared-streak/
```

---

## Is it shared by unrelated parts of the application?

If yes:

Place it inside:

```text
features/

shared/
```

---

## Is it application infrastructure?

If yes:

Consider:

```text
core/

api/

auth/
```

instead.

---

# Promote, Don't Predict

Never extract code because it *might* be reused.

Start with duplication. It sounds odd but it's better than overcomplicating.

Extract only after multiple features genuinely require the same responsibility.

This keeps abstractions meaningful.

---

# Naming

Prefer names that describe responsibilities.

Good examples:

```text
match.preview.service.js

shared.table.ui.js

survivor.controller.js
```

Avoid names based only on implementation.

When in doubt, ask:

> What responsibility does this module own?

---

# Public APIs

Large features expose a single public entry point.

Typically:

```text
index.js
```

External modules should import from the feature root whenever possible.

Example:

```javascript
import { survivorController } from "../survivor-streak/index.js";
```

Internal modules may reference each other directly.

---

# Folder Structure

There is no mandatory internal structure.

A feature should only contain the folders it actually needs.

Possible examples include:

```text
controller/

services/

state/

ui/

events/

helpers/

dom/
```

Creating empty folders in anticipation of future growth should be avoided.

---

# Shared Components

Application-wide reusable components belong to:

```text
features/

shared/
```

Examples include:

- Navbar
- Footer
- Sidebar
- Toast
- Modal

These components should remain independent of business logic.

---

# Shared Domains

Some functionality is shared only within a specific business domain.

Example:

```text
shared-streak/
```

These modules should remain focused on that domain and should not become generic application utilities.

---

# Code Reviews

When reviewing code, consider the following questions.

## Ownership

Does this module belong to the correct feature?

---

## Cohesion

Are closely related responsibilities located together?

---

## Simplicity

Is the solution simpler than the problem?

---

## Abstraction

Has reusable code been extracted because it is genuinely reused?

Or because it might become reusable?

---

## Naming

Does the module describe its responsibility clearly?

---

## Encapsulation

Does the feature expose only what other features need?

---

# Refactoring Principle

When improving existing code, prefer many small, validated changes over large rewrites.

Each refactor should leave the project in a working state before moving to the next step.

This approach reduces risk, simplifies debugging, and allows architectural decisions to be validated incrementally.

---

# Architectural Checklist

Before merging new code, verify:

- The module has a clear owner.
- The feature remains cohesive.
- New folders are justified by complexity.
- Public APIs remain clean.
- No unnecessary abstractions were introduced.
- Existing architecture became simpler rather than more complex.

---

# The Goal

The goal of this architecture is not to create perfect folder structures.

The goal is to make future development easier than past development.

Every contribution should leave the project slightly easier to understand than it was before.

> **A good architectural decision is one that makes the next feature easier to build without making the current feature harder to understand.**