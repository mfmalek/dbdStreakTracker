> **This document describes the architectural principles of the project, not its current implementation.
The implementation may evolve over time, but new code should continue to follow the principles described here.**

# Frontend Architecture

## Philosophy

The frontend is organized around **ownership**, not implementation.

Every module belongs to the feature, subsystem, or application layer that owns its responsibility.

The objective of this architecture is to keep related code together, minimize coupling between features, and allow the project to grow without constantly reorganizing the codebase.

A developer should be able to answer:

> **"Who owns this responsibility?"**

and immediately know where the code belongs.

---

# Architectural Layers

The project is divided into four primary layers.

```text
Application
│
├── Core
│
├── Features
│
├── Shared Feature Domains
│
└── Shared Application Components
```

Each layer has a different responsibility.

---

# Core

The `core/` directory contains application-wide logic that is independent of any specific feature.

Examples include:

* shared calculations
* application utilities
* data providers
* global state abstractions
* generic configuration

Core modules should never contain feature-specific business logic.

---

# Features

The `features/` directory contains every business capability of the application.

Examples include:

```text
features/

match-form/

survivor-streak/

killer-streak/

profile/
```

Each feature owns its own implementation.

Large features organize themselves internally.

Small features remain intentionally flat.

There is no mandatory folder structure.

Structure should emerge naturally as complexity grows.

---

# Shared Feature Domains

Some functionality is shared between multiple features while still belonging to a specific domain.

For example:

```text
shared-streak/
```

contains functionality reused by Survivor Streak and Killer Streak.

This code is **not** shared by the entire application.

It belongs to the streak domain.

Typical responsibilities include:

* shared controllers
* shared UI rendering
* shared formatters
* shared DOM helpers

A shared domain exists only when multiple related features depend on the same behavior.

---

# Shared Application Components

Some modules belong to the application itself rather than a specific feature.

Examples include:

```text
shared/

components/

navbar.js
```

These components may be used across completely unrelated pages such as:

* Home
* Profile
* Login
* Streak

Application shared components must remain independent of business logic.

---

# Ownership

Ownership is the primary architectural principle.

A module always belongs to the smallest scope that completely owns its responsibility.

Example:

```text
Survivor-only logic
```

belongs to

```text
features/survivor-streak/
```

not to shared modules.

Likewise,

```text
Shared between Survivor and Killer
```

belongs to

```text
shared-streak/
```

not to application shared components.

Only functionality used across unrelated parts of the application belongs to

```text
shared/
```

---

# Promote, Don't Predict

Reusable code is never extracted prematurely.

Every module starts inside the feature that owns it.

Only after another feature genuinely requires the same responsibility should the module be promoted into a shared location.

Architecture follows actual reuse, not anticipated reuse.

---

# Complexity Creates Structure

New features begin as simple as possible.

Example:

```text
profile/

profile.controller.js

profile.listeners.js
```

As responsibilities increase, the feature may naturally evolve into:

```text
controller/

state/

services/

ui/

events/

helpers/
```

Folders should exist because complexity requires them.

Never because a template expects them.

---

# Public APIs

Large features expose a single public entry point.

Typically:

```text
index.js
```

External modules import through the feature's public API.

Internal modules are free to reference one another directly.

This provides encapsulation while keeping the internal implementation flexible.

---

# Responsibility Before Implementation

Modules are named after what they do.

Examples:

```text
preview.service.js
```

instead of

```text
preview.ui.js
```

when the module generates data rather than rendering HTML.

Folder names should describe responsibilities instead of technical implementation whenever possible.

---

# Shared Modules

Shared modules are intentionally conservative.

A module belongs in a shared location only when all of the following are true:

* it is reused
* it has no single feature owner
* promoting it improves cohesion rather than reducing it

Similarity alone is not sufficient reason for extraction.

Ownership always takes priority.

---

# Feature Independence

Features should communicate through their public APIs.

A feature should avoid depending on another feature's internal implementation.

This allows each subsystem to evolve independently.

---

# Scalability

The architecture is designed so that future features can be added without modifying existing structures.

Examples of future features include:

* Statistics
* Achievements
* Leaderboards
* History
* Settings

Each new feature should naturally fit into the existing ownership model.

If a new feature requires restructuring unrelated modules, the architecture should be reconsidered.

---

# Guiding Principle

Whenever there is uncertainty about where a module belongs, ask a single question:

> **Who owns this responsibility?**

The answer should determine the module's location.

Ownership is always more important than similarity, implementation details, or anticipated reuse.