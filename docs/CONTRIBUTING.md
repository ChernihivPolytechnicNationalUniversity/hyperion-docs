# Contributing to Documentation

This guide explains how to add and maintain documentation in the Hyperion Docs system.

## Quick Links

- **Templates**: See [templates/](templates/) for ready-to-use documentation templates
- **Guides**:
  - [Documentation Types](guides/documentation-types.md) - When to use each type
  - [Diagram Guide](guides/diagram-guide.md) - Working with PlantUML, Mermaid, and diagrams
  - [Writing Guide](guides/writing-guide.md) - Style and formatting standards

## Documentation Structure

### Directory Organization

```
apps/docs/
├── content/docs/
│   ├── architecture/              # Architecture documentation
│   │   └── {project}/             # Project-specific architecture
│   │       ├── adr/               # Architecture Decision Records
│   │       ├── c4/                # C4 Model diagrams
│   │       ├── erd/               # Entity Relationship Diagrams
│   │       ├── solution-designs/  # Feature/solution designs
│   │       │   └── {solution-number}/
│   │       │       ├── solution-design.mdx
│   │       │       └── test-design.mdx
│   │       ├── sequence/          # Sequence diagrams
│   │       │   ├── client-1/
│   │       │   ├── client-2/
│   │       │   └── client-3/
│   │       └── strategy/          # Strategic documents
│   │
│   ├── agreements/                # Technical agreements & standards
│   │   ├── common/                # Common standards (all languages)
│   │   ├── {lang-1}/              # Language-specific standards
│   │   └── {lang-2}/
│   │
│   ├── support/                   # Support documentation
│   ├── guidelines/                # Technical guidelines
│   ├── process/                   # Process documentation
│   └── openapi/                   # OpenAPI documentation
│
├── diagrams/                      # Diagram source files
│   ├── architecture/{project}/    # Match docs structure
│   └── themes/                    # PlantUML themes
│
└── openapi/                       # OpenAPI spec files
    └── {project}/{resource}.yaml
```

### File Placement Conventions

- **Architecture by Project**: All architecture documentation organized by project
- **ADRs**: Architecture Decision Records in `/architecture/{project}/adr/`
- **Solution Designs**: Feature designs with test designs in `/architecture/{project}/solution-designs/{number}/`
- **Sequence Diagrams**: Organized by client in `/architecture/{project}/sequence/{client}/`
- **Agreements**: Technical standards in `/agreements/{lang}/`
- **Guidelines**: Step-by-step instructions in `/guidelines/{topic}/`
- **Process**: Workflow documentation in `/process/{topic}/`
- **Index files**: Each subdirectory should have an `index.mdx` as the overview page

## File Naming Conventions

### MDX Files
- Use **kebab-case**: `my-document.mdx`
- Use descriptive names: `create-customer.mdx` not `create.mdx`
- Index files: Always named `index.mdx`

### Diagram Files
- Use **kebab-case**: `system-architecture.puml`
- Include descriptive names: `processing-flow.puml` not `flow.puml`
- Extensions:
  - PlantUML: `.puml`
  - Graphviz: `.dot`

### Subdirectories
- Use **kebab-case**: `solution-design/`, `seq/`
- Use descriptive names

## Frontmatter Standards

Every MDX file must include frontmatter:

### Required Fields

```yaml
---
title: Page Title
description: Brief description of the page content
---
```

### Optional Fields

```yaml
---
title: Page Title
description: Brief description of the page content
icon: IconName  # Lucide icon name (e.g., Book, Network, Code)
---
```

### Guidelines

- **Title**: Use title case, concise and descriptive
- **Description**: One sentence summary, plain text (no markdown)
- **Icon**: Use Lucide React icon names when applicable

## Navigation Configuration

Navigation is configured using `meta.json` files in each directory.

### Structure

```json
{
  "title": "Section Title",
  "pages": [
    "page-filename",
    "---Section Separator---",
    "another-page",
    "subdirectory"
  ]
}
```

### Guidelines

- **title**: The section title displayed in navigation
- **pages**: Array of page filenames (without `.mdx`) and separators
- **Separators**: Use `"---Text---"` format for visual separators
- **Order**: Pages appear in the order listed
- **Subdirectories**: Include directory names to link to nested sections

## MDX Components

### Diagram Component

#### External Diagram Files (PlantUML, Graphviz, C4)

```mdx
<Diagram
  lang="plantuml"
  path="relative/path/to/diagram.puml"
  alt="Descriptive alt text"
/>
```

**Parameters:**
- `lang`: Diagram language (`plantuml`, `puml`, `graphviz`, `dot`, `c4plantuml`)
- `path`: Relative path from `diagrams/` directory
- `alt`: Accessibility text describing the diagram

#### Inline Diagrams (Mermaid)

```mdx
<Diagram
  lang="mermaid"
  chart="
graph TD;
  A[Start] --> B[Process];
  B --> C[End];
  "
/>
```

See [Diagram Guide](guides/diagram-guide.md) for detailed diagram usage.

## OpenAPI Integration

### File Location
Place OpenAPI specification files in the `openapi/` directory:

```
apps/docs/openapi/
└── {project}/{resource}.yaml
```

### Configuration
Register OpenAPI specs in `apps/docs/src/lib/openapi.ts`:

```typescript
import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: ['./openapi/your-api.yaml'],
});
```

### Build Process

```bash
pnpm build:openapi
```

This generates MDX files in `apps/docs/content/docs/openapi/(generated)/`.

## Security Guidelines

### Diagram Files

- **Size Limits**: Maximum 256 KB per file (after includes)
- **Path Validation**: All paths must be within `diagrams/` directory
- **Language Allowlist**: Only supported diagram types accepted

### Content Guidelines

- Never include API keys, tokens, or credentials
- Use placeholder values in examples
- Sanitize any data before including in documentation

## Common Commands

```bash
# Start development
pnpm dev

# Generate OpenAPI docs
pnpm build:openapi

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## Getting Help

- See [Documentation Types](guides/documentation-types.md) to choose the right document type
- Use [templates/](templates/) for ready-to-use document templates
- Review [Diagram Guide](guides/diagram-guide.md) for diagram best practices
- Follow [Writing Guide](guides/writing-guide.md) for style conventions
