# Documentation Types

This guide explains the different types of documentation we maintain and when to use each one.

## Documentation Types Overview

| Type | What | When to Create | Location | Example |
|------|------|----------------|----------|---------|
| **ADR** | High-level architectural decisions + WHY | When choosing architecture approach | `/architecture/{project}/adr/` | "Trunk-based development", "Microservices architecture" |
| **Agreement** | Technical standards and conventions | When selecting specific tools/practices | `/agreements/{lang}/` | "PHPStan level 8 for PHP", "ESLint rules for TypeScript" |
| **Process** | Workflow - WHO, WHEN, WHAT sequence | When establishing new team process | `/process/{topic}/` | "Duty Process", "Branch Strategy" |
| **Guideline** | Technical HOW TO instructions | When documenting implementation steps | `/guidelines/{topic}/` | "PHP Tracing Integration", "Go Data Isolation" |
| **Solution Design** | Feature/project design document | Before implementing major features | `/architecture/{project}/solution-designs/{solution-number}/` | Feature design, System design |
| **Test Design** | Testing strategy for feature | Together with Solution Design | `/architecture/{project}/solution-designs/{solution-number}/` | Feature test plan, QA strategy |
| **C4 Diagram** | Architecture visualization (4 levels) | When architecture changes | `/architecture/{project}/c4/` | System Context, Container diagram |
| **Sequence Diagram** | Step-by-step component interactions | When showing flow between services | `/architecture/{project}/sequence/` | Payment flow, Auth flow |
| **ERD** | Data structure and relationships | When designing/changing database | `/architecture/{project}/erd/` | Database schema |
| **OpenAPI** | REST API specification | When creating/modifying API | `/openapi/{project}/{service}/` | API endpoints, schemas |
| **Strategy** | Architectural strategy documents | For long-term direction | `/architecture/{project}/strategy/` | Modernization approach |

## When to Use Each Type

### ADR (Architecture Decision Record)
**Use when**: You need to document a significant architectural decision that will impact the system long-term.

**Examples**:
- Choosing microservices vs monolith
- Selecting a database technology
- Deciding on authentication approach
- Trunk-based development vs GitFlow

**Template**: [templates/adr-template.md](../templates/adr-template.md)

### Agreement
**Use when**: Teams need to agree on technical standards, conventions, or tool configurations.

**Examples**:
- Code style rules (ESLint, Prettier configs)
- Linter levels (PHPStan level 8)
- Testing requirements
- Code review standards

**Template**: [templates/agreement-template.md](../templates/agreement-template.md)

### Process
**Use when**: You need to document a workflow that involves multiple people and steps.

**Examples**:
- Duty support rotation process
- Branch strategy and PR workflow
- Release process
- Incident response procedure

**Template**: [templates/process-template.md](../templates/process-template.md)

### Guideline
**Use when**: You need step-by-step instructions for implementing something technical.

**Examples**:
- How to integrate tracing in PHP
- Data isolation implementation guide
- Setting up local development environment
- Deploying to production

**Template**: [templates/guideline-template.md](../templates/guideline-template.md)

### Solution Design
**Use when**: Planning a significant feature or system component before implementation.

**Examples**:
- New payment processing feature
- Email notification system
- API versioning approach
- Data migration plan

**Template**: [templates/solution-design-template.md](../templates/solution-design-template.md)

### Test Design
**Use when**: Creating solution design - always pair these together.

**Examples**:
- Test strategy for new feature
- QA checklist
- Performance testing approach
- Integration test plan

**Template**: [templates/test-design-template.md](../templates/test-design-template.md)

### C4 Diagram
**Use when**: Documenting system architecture at different abstraction levels.

**The 4 Levels**:
1. **System Context**: High-level view showing users and external systems
2. **Container**: Major building blocks (apps, databases, services)
3. **Component**: Internal structure of containers
4. **Code**: Class-level details (optional)

**See**: [Diagram Guide](diagram-guide.md#c4-architecture-diagrams)

### Sequence Diagram
**Use when**: Showing interactions between components over time.

**Examples**:
- API request flow
- Authentication process
- Payment transaction
- Data synchronization

**Template**: [templates/sequence-diagram-template.md](../templates/sequence-diagram-template.md)

### ERD (Entity Relationship Diagram)
**Use when**: Designing or documenting database schema.

**Examples**:
- Database schema design
- Data model documentation
- Schema migration planning

**Template**: [templates/erd-template.md](../templates/erd-template.md)

### OpenAPI
**Use when**: Defining or documenting REST APIs.

**Examples**:
- API specification
- API contract definition
- API documentation

**Process**: Create YAML spec → Run `pnpm build:openapi` → Generated docs appear

### Strategy
**Use when**: Documenting long-term architectural direction or approach.

**Examples**:
- Migration from monolith to microservices
- Technology modernization plan
- Platform evolution roadmap

## Best Practices

### Choose the Right Type

- **ADR for decisions**: Document WHY you chose something, not just WHAT
- **Agreement for standards**: Document what teams agreed to follow
- **Process for workflows**: Document WHO, WHEN, WHAT
- **Guideline for instructions**: Document HOW TO step-by-step
- **Solution Design before code**: Always design before implementing features

### Pair Related Documents

- **Solution Design + Test Design**: Always create together
- **ADR + Agreement**: Decisions often lead to standards
- **Process + Guideline**: Workflows often need implementation guides

### Keep Documents Focused

- One document = one purpose
- Link between related documents
- Avoid duplicating information

### Update Regularly

- Mark ADRs as Deprecated/Superseded when no longer valid
- Review Agreements periodically
- Update Guidelines when tools/APIs change
- Keep Solution Designs as historical record (don't delete)

## Examples

### Real-World Examples

- **ERD Validation**: [Example on GitHub](https://gist.github.com/Yozhef/0241b939e4d0f8a1cb8802b59cd8e52b)
- **Complete Solution Design**: [Example on GitHub](https://gist.github.com/Yozhef/9d58c6afc36fee4c3ff55fd6904c4d04)
