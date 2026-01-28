# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose: Two Distinct Streams

This repository serves **two separate purposes**:

### Stream 1: Documentation Platform Development
**When working on the tech stack itself:**
- Modifying Next.js app, Fumadocs integration, Kroki service
- Adding new diagram types, API routes, components
- Infrastructure changes (Docker, build system, CI/CD)
- **Use sections**: Development Commands, Architecture Overview, Technical Implementation

### Stream 2: Documentation Authoring
**When writing documentation for your projects:**
- Creating ADRs, Solution Designs, ERDs for **your projects** (unrelated to this platform)
- Writing architecture documentation, sequence diagrams, test designs
- Projects being documented have **no relationship** to this documentation platform
- **Use sections**: For Documentation Authors (below)

---

## For Documentation Authors

**If you're here to write/update documentation for your projects**, you need:

- **Documentation Standards**: [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)
- **Templates**: [docs/templates/](docs/templates/) (ADR, Solution Design, ERD, etc.)
- **Guides**: [docs/guides/](docs/guides/)
  - When to use each doc type
  - Diagram usage & theming
  - Writing standards

**Platform Capabilities** (what you can use):
- Diagram types: PlantUML, Mermaid, Graphviz, C4
- MDX components: `<Diagram>`, clickable/zoomable diagrams
- Diagram files: Place in `apps/docs/diagrams/`
- Content files: Place in `apps/docs/content/docs/`

**Common Author Commands**:
```bash
pnpm dev              # Preview your documentation
pnpm build:openapi    # Generate API docs from YAML
```

**Git Workflow for Claude**:
When making changes to documentation:
1. **After completing a logical unit of work**, create a git commit
   - Completed document (ADR, solution design, etc.)
   - Set of related diagram updates
   - Template modifications
2. **Use descriptive commit messages** following convention:
   ```bash
   docs: <what changed>

   <why it changed or context>
   ```
3. **Examples**:
   ```bash
   git add . && git commit -m "docs: add payment processing solution design

   Includes sequence diagrams and ERD for new payment flow"

   git add . && git commit -m "docs: update authentication ADR to deprecated status

   Superseded by ADR-015 OAuth2 implementation"
   ```
4. **Benefits**: Allows tracking changes, reviewing history, and rollback if needed

---

## For Platform Developers

**If you're modifying the documentation platform itself**, here's the technical context:

## Development Commands

### Environment Setup & Development
```bash
# Start both services (Next.js docs + Kroki) with auto-install of dependencies
pnpm dev
# or use the script directly
./scripts/dev.sh

# Stop services
pnpm stop
# or
./scripts/stop.sh

# Local development (docs only, without Docker)
cd apps/docs
pnpm dev
# Note: You'll need to set KROKI_BASE_URL to a public Kroki instance
```

### Build & Type Checking
```bash
# Type checking
pnpm typecheck
# or for a specific workspace
cd apps/docs && pnpm typecheck

# Generate Next.js types (auto-runs after install)
pnpm typegen

# Build OpenAPI documentation from YAML specs
pnpm build:openapi

# Lint
pnpm lint
```

### Requirements
- Node.js 22+
- pnpm 10+
- Docker & Docker Compose v2

### Git Workflow for Platform Changes

When making platform code changes:
1. **Before committing**, verify:
   ```bash
   pnpm typecheck    # Ensure no type errors
   pnpm lint         # Ensure code style compliance
   pnpm build        # Ensure build succeeds (optional but recommended)
   ```
2. **After completing a logical unit of work**, create a git commit:
   - Feature implementation (new diagram type, API endpoint)
   - Bug fix
   - Refactoring
3. **Use conventional commit messages**:
   ```bash
   <type>: <description>

   <optional body>
   ```
   Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
4. **Examples**:
   ```bash
   git add . && git commit -m "feat: add D2 diagram support

   - Added D2 to LANG_MAP in API route
   - Updated diagram guide with D2 examples
   - Tested with sample D2 diagrams"

   git add . && git commit -m "fix: resolve PlantUML include circular dependency detection

   Improved include tracking to prevent infinite loops"
   ```
5. **Benefits**: Track changes, enable code review, allow safe rollback

## Architecture Overview

### Two-Service System
This is a monorepo with a two-service architecture orchestrated via Docker Compose:
1. **docs** - Next.js 15 app with Fumadocs (port 3000)
2. **kroki** - Diagram rendering service (port 8000)

The services communicate internally via Docker networking, with the docs service proxying diagram requests to Kroki.

### Diagram Rendering Flow

There are **two distinct rendering paths** depending on diagram type:

#### Path 1: Server-Side Rendering (PlantUML, Graphviz, C4)
```
MDX File → <Diagram> Component → /api/diagram Route → Kroki Service → SVG
```

1. MDX files use `<Diagram lang="plantuml" path="relative/path.puml" />`
2. Component fetches from `/api/diagram?lang=plantuml&path=...`
3. API route (`apps/docs/src/app/api/diagram/route.ts`):
   - Reads file from `apps/docs/diagrams/` (security: path must resolve within BASE_DIR)
   - Resolves `!include` directives recursively (see below)
   - Validates file size (max 256KB)
   - Compresses content with pako (deflate + base64 encoding)
   - Forwards to Kroki: `http://kroki:8000/{kind}/svg/{encoded}`
4. SVG returned to client

**IMPORTANT**: The `/api/diagram` route uses `runtime = 'nodejs'` because it requires `fs` access. Do not change this to Edge runtime.

#### Path 2: Client-Side Rendering (Mermaid)
```
MDX File → <Diagram> Component → Mermaid Library → SVG
```

1. MDX files use `<Diagram lang="mermaid" chart="graph TD; A-->B" />`
2. Component renders Mermaid directly in browser via `useSvgDiagramMarkup` hook
3. No API call or Kroki service involved

### PlantUML Include Resolution System

The API route implements a sophisticated `!include` directive resolver (`resolveIncludes` function) that:
- **Recursively resolves** PlantUML includes before sending to Kroki
- **Security**: All included paths must resolve within `apps/docs/diagrams/`
- **Circular include detection**: Tracks included files to prevent infinite loops
- **System includes**: Skips includes like `<C4/C4_Container>` (Kroki handles these)
- **Tag cleanup**: Removes `@startuml`/`@enduml` from included files to prevent nesting issues

When working with PlantUML files that use `!include`, the entire resolved content is sent as a single diagram to Kroki.

### Security Model

**Path Traversal Protection**:
- All diagram paths are resolved with `path.resolve(BASE_DIR, relPath)`
- Validation: `if (!abs.startsWith(BASE_DIR))` blocks access outside `diagrams/`
- Applies to both main files and `!include` directives

**Size Limits**:
- Max 256KB per diagram file (after include resolution)
- Enforced before sending to Kroki

**Language Allowlist**:
- Only languages in `LANG_MAP` are accepted
- Easily extensible by adding entries to the map

### Modal/Whiteboard Viewer

The `<Diagram>` component integrates with a modal system:
- Click any diagram → Opens `<PreviewModal>` with fullscreen whiteboard
- Uses `@xyflow/react` (React Flow) for pan/zoom controls
- SVG rendered as a custom node in the flow canvas
- Modal system uses context (`useModal` hook) for imperative opening

### Platform File Structure

**Content & Documentation**:
- MDX Documentation: `apps/docs/content/docs/` (processed by Fumadocs)
- Diagram Source Files: `apps/docs/diagrams/` (referenced via relative paths)
- OpenAPI Specs: `apps/docs/openapi/` (generates MDX via `pnpm build:openapi`)

**Platform Source Code**:
- Diagram API: `apps/docs/src/app/api/diagram/route.ts`
- Components: `apps/docs/src/components/`
- Configuration: `source.config.ts`, `turbo.json`

### Extending Diagram Types

To add support for new diagram languages (e.g., D2, Excalidraw):

1. Add to `LANG_MAP` in `apps/docs/src/app/api/diagram/route.ts`:
   ```ts
   const LANG_MAP: Record<string, string> = {
     // ...existing
     d2: 'd2',
   };
   ```

2. Verify Kroki supports the language (check Kroki docs)

3. Optionally add icon and display name:
   - Icon: `apps/docs/src/components/icons/`
   - Name: `apps/docs/src/lib/constants.ts` (LANG_NAME_MAP)

4. Use in MDX: `<Diagram lang="d2" path="my-diagram.d2" />`

### Turbo & Monorepo Setup

- Root package.json scripts delegate to Turbo for caching
- Turbo tasks defined in `turbo.json`
- `pnpm-workspace.yaml` defines monorepo structure
- Key dependency chains:
  - `build:openapi` runs before `build` (via prebuild hook)
  - `typegen` runs after `pnpm install` (via postinstall)

### Hot Reload in Docker

The Docker Compose setup mounts source directories as volumes:
- `./apps/docs:/app/apps/docs` - Source code hot reload
- `.next` cache is a named volume (persists across restarts but doesn't block HMR)
- `WATCHPACK_POLLING=true` ensures file watching works in Docker on all platforms
