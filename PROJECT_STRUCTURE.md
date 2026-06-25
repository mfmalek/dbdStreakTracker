> **If you're looking for the implementation of a feature, start in ```features/```.
If you're looking for application infrastructure, start in ```core/```, ```auth/```, or ```api/```.
If you're looking for page initialization, start in ```pages/```.**

# Project Structure

This document provides an overview of the project's directory structure and the responsibility of each major module.

Unlike `ARCHITECTURE.md`, which explains the architectural philosophy, this document describes how that philosophy is currently organized in the codebase.

---

# Frontend Structure

```text
js/
├── api/
├── auth/
├── core/
├── features/
├── pages/
└── app.js
```

Each directory has a well-defined responsibility.

---

# api/

Responsible for communication with the backend.

Examples include:

- authentication requests
- match management
- groups
- user profile

API modules should only be responsible for HTTP communication.

They should not contain business logic or UI logic.

---

# auth/

Contains authentication logic used throughout the application.

Typical responsibilities include:

- login validation
- logout
- session verification
- route protection

Authentication is considered an application-level concern.

---

# core/

Contains application-wide logic that is independent of any specific feature.

Examples include:

- shared calculations
- data providers
- application utilities
- global configuration

Core modules are reusable because they solve application problems rather than feature problems.

---

# features/

Contains every business feature of the application.

Each feature owns its own implementation.

Example:

```text
features/

match-form/

survivor-streak/

killer-streak/

shared-streak/

profile/

shared/
```

Each feature is responsible for organizing its own internal structure.

Large features may contain controllers, services, state, UI, events, helpers, and DOM modules.

Smaller features remain intentionally flat.

---

## match-form/

Responsible for creating, editing, validating, and deleting matches.

This feature owns the complete match submission workflow.

---

## survivor-streak/

Contains all Survivor-specific business logic.

Examples include:

- survivor controllers
- survivor UI
- survivor configuration

---

## killer-streak/

Contains all Killer-specific business logic.

Examples include:

- killer controllers
- killer UI
- killer presets

---

## shared-streak/

Contains functionality shared between multiple streak modes.

Typical responsibilities include:

- shared streak UI
- shared controllers
- formatters
- common DOM helpers

This is **not** an application-wide shared module.

Its responsibility is limited to the streak domain.

---

## shared/

Contains reusable application components.

Examples include:

```text
components/

navbar/
```

Modules inside this feature may be reused by unrelated pages throughout the application.

For example: Home, Profile, Streak.

These components should remain independent of business logic.

---

# pages/

Contains page initializers.

Each page is responsible for bootstrapping the required features.

Typical responsibilities include:

- authentication checks
- loading application state
- initializing features
- page startup

Pages coordinate features.

They do not implement business logic.

---

# app.js

Application entry point.

Responsible for loading the appropriate page initializer.

Business logic should never live here.

---

# Typical Dependency Flow

```text
Page
    │
    ▼
Feature
    │
    ▼
Core
```

Features may depend on Core.

Pages initialize Features.

Core should remain independent of Features.

---

# Ownership Summary

| Layer | Responsibility |
|--------|----------------|
| api | Backend communication |
| auth | Authentication |
| core | Application-wide logic |
| features | Business capabilities |
| shared-streak | Shared streak functionality |
| shared | Shared application components |
| pages | Page initialization |
| app.js | Application bootstrap |

---

The project structure is expected to evolve as new features are introduced.

New modules should follow the ownership principles defined in `ARCHITECTURE.md`.