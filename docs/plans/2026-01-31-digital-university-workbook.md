# Digital University Documentation Workbook

This workbook tracks the documentation progress for the NPP (Науково-педагогічні працівники) Portal project.

**Project**: University Faculty Work Portal
**Domain**: npp.stu.cn.ua
**Started**: 2026-01-31
**Last Updated**: 2026-01-31

---

## Documentation Status Legend

| Status | Meaning |
|--------|---------|
| ✅ | Complete |
| 🔶 | Partial (needs more input) |
| ⬜ | Not started |
| 🚫 | Blocked (waiting for info) |

---

## 1. Project Overview

| Document | Status | Notes |
|----------|--------|-------|
| `index.mdx` - Project overview | ✅ | Complete with purpose, tech stack, user roles |
| `glossary/index.mdx` - Domain terms | ✅ | Ukrainian ↔ English translations |

---

## 2. Architecture Decision Records (ADRs)

| Document | Status | Notes |
|----------|--------|-------|
| ADR-001: Initial Architecture | ✅ | Spring Boot + React + PostgreSQL monolith |
| ADR-002: Database Selection | ✅ | PostgreSQL rationale with config examples |
| ADR-003: Authentication Strategy | ✅ | JWT + Redis hybrid with token flows |
| ADR-004: Role-Based Access Control | 🔶 | Covered in ADR-003, could be separate |
| ADR-005: Read-Only Mode | 🔶 | Covered in SD-002, could be separate |

---

## 3. C4 Architecture Diagrams

| Document | Status | Notes |
|----------|--------|-------|
| System Context | ✅ | All user types and external systems |
| Container Diagram | ✅ | SPA, API, Redis, PostgreSQL |
| User Profile Service (Component) | ⬜ | Internal structure - future |
| Activity Service (Component) | ⬜ | Internal structure - future |

---

## 4. Entity Relationship Diagrams

| Document | Status | Notes |
|----------|--------|-------|
| Main Schema | ✅ | Full schema with all 4 domains |
| User Domain ERD | ✅ | Included in main schema |
| Activity Domain ERD | ✅ | Included in main schema |
| Organization Structure ERD | ✅ | Included in main schema |

---

## 5. Sequence Diagrams

| Document | Status | Notes |
|----------|--------|-------|
| Auth Flow (login/logout/refresh) | 🔶 | Covered in ADR-003, separate diagram TBD |
| Profile Management | 🔶 | Covered in SD-001, separate diagram TBD |
| Activity CRUD | 🔶 | Covered in SD-002, separate diagram TBD |
| Statistics & Ratings | ⬜ | Rating calculation flow |
| Admin: User Management | ⬜ | Create user, assign roles |
| Public: Guest Access | ⬜ | Public endpoints flow |

---

## 6. Solution Designs

| Document | Status | Notes |
|----------|--------|-------|
| **SD-001: Personal Account Module** | ✅ | |
| - solution-design.mdx | ✅ | User profile, auth, departments, API endpoints |
| - test-design.mdx | ✅ | Comprehensive test cases |
| **SD-002: Work Reporting Module** | ✅ | |
| - solution-design.mdx | ✅ | Activities, ratings, read-only mode |
| - test-design.mdx | ✅ | Comprehensive test cases |

---

## 7. API Documentation

| Document | Status | Notes |
|----------|--------|-------|
| OpenAPI Spec Integration | 🔶 | Spec exists at source, needs copy to `openapi/` |

---

## 8. Strategy & Roadmap

| Document | Status | Notes |
|----------|--------|-------|
| `strategy/index.mdx` | ⬜ | Future modules, roadmap |

---

## Information Gaps

These items need clarification or additional input:

1. **ERD Conversion**: drawio file needs to be converted to PlantUML diagrams
2. **Deployment Architecture**: Docker/K8s setup details
3. **External Integrations**: LDAP? Email service? Export systems?
4. **Rating Algorithm**: Exact formula for teacher/department ratings
5. **Read-Only Mode**: When and why it's activated
6. **Data Migration**: Source of initial data (Excel? Legacy system?)

---

## Session Log

### 2026-01-31 - Initial Analysis & Documentation Sprint
- Analyzed source materials (screenshots, OpenAPI spec, backend code)
- Identified two main modules: Personal Account + Work Reporting
- Documented user roles: GUEST, TEACHER, DIRECTOR, ADMIN
- Created documentation structure plan
- Created this workbook

**Completed in this session:**
1. ✅ Updated project overview (index.mdx) with full details
2. ✅ Created comprehensive glossary with Ukrainian ↔ English terms
3. ✅ Completed ADR-001: Initial Architecture (monolith decision)
4. ✅ Completed ADR-002: Database Selection (PostgreSQL)
5. ✅ Created ADR-003: Authentication Strategy (JWT + Redis)
6. ✅ Updated C4 System Context diagram with all actors
7. ✅ Updated C4 Container diagram with all components
8. ✅ Created complete ERD with all 4 domains
9. ✅ Created Solution Design 001: Personal Account Module
10. ✅ Created Test Design for Personal Account Module
11. ✅ Created Solution Design 002: Work Reporting Module
12. ✅ Created Test Design for Work Reporting Module

### Next Steps (Future Sessions)
1. Create detailed sequence diagrams for key flows
2. Add component-level C4 diagrams
3. Copy OpenAPI spec to documentation platform
4. Create ADR-004 for RBAC (if needed separately)
5. Create ADR-005 for Read-Only Mode (if needed separately)
6. Add strategy/roadmap document

---

## Quick Reference

### User Roles
| Role | Description | Capabilities |
|------|-------------|--------------|
| GUEST | Unauthenticated | Public endpoints only |
| TEACHER | Faculty member | Own profile, own activities |
| DIRECTOR | Dept head/Dean | + View department staff, statistics |
| ADMIN | System admin | + CRUD users, dictionaries, structure |

### Work Types
| Code | Ukrainian | English |
|------|-----------|---------|
| SCIENCE | Наукова робота | Scientific work |
| METHOD | Методична робота | Methodological work |
| ORG | Організаційна робота | Organizational work |

### Key Entities
| Entity | Purpose |
|--------|---------|
| User | Base user account |
| UserDetails | Extended profile (degree, position, photo) |
| UserDepartment | User ↔ Department assignment with workload |
| Activity | Work record (description, year, semester, type) |
| ActivityDetails | Dictionary of activity types with coefficients |
| Institute → Faculty → Department | Organizational hierarchy |

### Tech Stack
| Layer | Technology |
|-------|------------|
| Backend | Spring Boot 3.x, Java 21 |
| Frontend | React + TypeScript + Vite |
| Database | PostgreSQL |
| Auth | JWT (Access: 30min, Refresh: 30days) + Redis |
| API | REST, OpenAPI 3.0 |
