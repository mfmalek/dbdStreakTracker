# Dead by Daylight Streak Tracker

A full-stack web application for tracking **Dead by Daylight** Survivor and Killer win streaks.

The project allows players to record matches, monitor current and best streaks, organize matches into groups, and visualize detailed match information through an interface designed specifically for long-term streak tracking.

Originally developed as a personal project, the application has evolved into a feature-oriented codebase with a documented architecture focused on maintainability, scalability, and clear ownership.

---

## About this project

This project began as a personal tool for tracking Dead by Daylight win streaks and gradually evolved into a long-term software engineering project.

Alongside new features, significant effort has been dedicated to improving the architecture, maintainability, and organization of the codebase.

Rather than focusing only on delivering functionality, the project serves as an opportunity to apply and practice software engineering principles through continuous, incremental improvements.

---

## Features

### Survivor Streak Tracking

* Track Survivor win streaks
* Support for Solo, Duo, Trio and Squad matches
* Survivor presets
* Custom survivor names
* Match history
* Best streak calculation
* Current streak calculation

### Killer Streak Tracking

* Individual streaks for every Killer
* Match history
* Current and best streak tracking
* Killer-specific statistics

### Match Management

* Create matches
* Edit matches
* Delete matches
* Match preview
* Map selection
* Perk selection
* Add-on selection

### Groups

* Create groups
* Organize streaks by group
* Separate progress between different groups

### User System

* User registration
* Authentication
* Protected routes

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript (ES Modules)

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

---

## Project Architecture

The frontend follows a **feature-oriented architecture** organized around ownership rather than implementation.

Each business capability is isolated into its own feature while shared functionality is promoted only after genuine reuse.

The project architecture is documented in:

* `ARCHITECTURE.md`
* `PROJECT_STRUCTURE.md`
* `CONTRIBUTING.md`

---

## Project Structure

```text
js/
├── api/
├── auth/
├── core/
├── features/
├── pages/
└── app.js
```

Features own their internal implementation and expose public APIs through `index.js` when appropriate.

---

## Running the Project

### Clone the repository

```bash
git clone https://github.com/mfmalek/dbdStreakTracker.git
```

### Install dependencies

```bash
npm install
```

### Configure the environment

Create a `.env` file with the required database configuration.

### Start the backend

```bash
npm start
```

### Open the application

```
http://localhost:3000
```

---

## Roadmap

Planned features include:

* Statistics
* Achievements
* Leaderboards
* Profile improvements
* Additional match analytics
* Performance improvements

---

## Philosophy

This project prioritizes:

* Clear ownership
* Feature independence
* Incremental refactoring
* Maintainable architecture
* Long-term scalability

Every architectural decision follows one guiding question:

> **Who owns this responsibility?**

---

## License

This project is licensed under the MIT License.
