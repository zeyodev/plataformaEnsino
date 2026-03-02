# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

E-learning platform ("plataforma de ensino") built as a TypeScript SPA using **Zeyo** (custom framework from github:zeyodev/zeyo). The app features offline-first data persistence with IndexedDB, real-time sync via Socket.io, and a custom state machine for navigation.

## Commands

- **Dev server (Express + Webpack watch):** `npm run dev`
- **Production build:** `npm run build`
- **Start server only:** `npm start`
- **No test suite configured.**

The `./run` script executes `node server.js` and `npx webpack -w` in parallel during development.

## Environment

Copy `.env.example` to `.env`. Required variables: `PORT`, `NODE_ENV`, `SERVER_URL`, `AUTH_SERVER_URL`.

## Architecture

### Entry Point & App Initialization
- [src/index.ts](src/index.ts) — Creates `App`, initializes `Context` with root state, sets up a `Queue` for sync processing
- [src/app.ts](src/app.ts) — `App` class extends `Plugins`, the composed mixin chain

### Plugin System (Mixin Composition)
[src/plugins/index.ts](src/plugins/index.ts) composes all plugins via nested mixins:

`Hash → Repository → RepositoryMemory → Route → ContextPlugin → Sleep → Socketio → AutenticacaoPlugin → DBs → RepositorySyncronizer → Root`

Each plugin adds capabilities: routing, IndexedDB access, Socket.io communication, authentication (token-based via `autenticador.zeyo.org`), state management, and data sync.

### State Machine Navigation
- Base class in [src/states/index.ts](src/states/index.ts) — Each `State` has `handle()`, `prerequisite()`, `commands`, `name`, and `children`
- [src/states/context/index.ts](src/states/context/) — `Context` manages current state, history, and transitions (`setState`, `backState`, `forward`, `back`)
- States form a tree: `Root → Usuario → (Aula, feature-specific states)`
- URL pattern: `/u/[username]/[feature]/[action]/...`

### Component Structure (Atomic Design)
[src/components/](src/components/) organized as:
- `atoms/` — Basic UI elements
- `molecules/` — Composed from atoms
- `organisms/` — Complex components (CRUD, Cards, Navigation)
- `templates/` — Page-level layouts

### Data Layer
- **IndexedDB:** [src/repository/IndexedDB/](src/repository/IndexedDB/) — Offline-first persistence with versioning, dynamic store creation, and aggregation queries
- **Sync:** [src/repository/sync.ts](src/repository/sync.ts) — Log-based sync protocol using `LogEntry` objects with ULID timestamps and `create/update/delete` actions
- **Socket.io:** Real-time communication with backend (`backend.metaorg.app`); auth tokens passed in socket headers
- **In-memory fixtures:** [src/repository/memory.ts](src/repository/memory.ts) — Seed data for collections (Componentes, Pilares, Modulos, Aulas, etc.)
- **Triggers:** Observer pattern via [src/repository/Trigger.ts](src/repository/Trigger.ts) for reacting to CRUD events

### Features
[src/features/](src/features/) contains domain modules: `acoes`, `ambiente`, `caracteristicas`, `collection`, `componente`, `etapa`, `formulario`, `interface`, `item`, `nicho`, `opcao`, `organizacao`, `propriedade`, `rotina`, `secao`, `usuario`.

### Key Conventions
- IDs generated with ULID (`ulid` package)
- CSS Modules supported (`.module.css` files) alongside global CSS
- SVGs imported as source strings
- Webpack bundles to `public/_js/bundle.js`
- TypeScript strict mode enabled, target ES2019
- The codebase and comments are in Portuguese
