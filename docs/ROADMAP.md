# 🧭 **NEXTRA Framework — Global Roadmap**

> 📘 Central roadmap for the evolution of the **NEXTRA Framework**, including core backend, real estate (RE) module, frontend client, and deployment layers.

---

## 🏗️ **PHASE 1 — CORE FRAMEWORK FOUNDATION**

**Goal:** Establish a reusable and secure backend kernel for all NEXTRA-based applications.

| Milestone | Description | Status | Session |
|------------|--------------|--------|----------|
| ✅ Core Architecture | Multi-module Maven setup (`core`, `re`) | ✔️ Completed | `progress_2025_10_16.md` |
| ✅ Auditing Layer | Implement `BaseEntity`, `AuditListener`, and metadata | ✔️ Completed | `progress_2025_10_20.md` |
| ✅ Service Abstraction | Generic `BaseService`, logging & exceptions | ✔️ Completed | `progress_2025_10_25.md` |
| ✅ REST API Foundation | Add `ApiResponse`, `BaseController`, `GlobalExceptionHandler` | ✔️ Completed | `progress_2025_10_30.md` |
| 🔄 Pagination & Sorting | Extend BaseController + introduce `PagedResponse` | ✔️ Completed | `progress_2025_10_30.md` |
| 🔐 JWT Security | `/auth/login`, token provider, and role scaffolding | ✔️ Completed | `progress_2025_10_30.md` |
| 🩺 Health & Metrics | Add `/api/health` and request performance metrics | ⏳ Planned | `progress_2025_11_XX.md` |

---

## 🏘️ **PHASE 2 — REAL ESTATE MODULE (NEXTRA RE)**

**Goal:** Deliver domain-specific logic and APIs for real estate management.

| Milestone | Description | Status | Session |
|------------|--------------|--------|----------|
| 🧱 Property Model | Create entity, repository, service, and controller | ✔️ Completed | `progress_2025_10_30.md` |
| 👤 Account Module | CRUD endpoints for agents / owners | ⏳ In Progress | `progress_2025_11_XX.md` |
| 🏷️ Category Module | CRUD endpoints for property categories | ⏳ Planned | `progress_2025_11_XX.md` |
| 🔗 Relationships | Link `Property ↔ Account ↔ Category` | ⏳ Planned |  |
| 📊 Aggregations | Average price, value per city/category | ⏳ Planned |  |
| 🔐 Role-based Security | Restrict endpoints by role (ADMIN / AGENT / VIEWER) | ⏳ Planned |  |

---

## 💻 **PHASE 3 — FRONTEND (NEXTRA CLIENT)**

**Goal:** Build the first client interface using React + Vite + Tailwind, connecting to NEXTRA Core APIs.

| Milestone | Description | Status | Session |
|------------|--------------|--------|----------|
| ⚙️ Setup Frontend App | Create Vite + Tailwind + Redux base | ⏳ Planned |  |
| 🔐 Auth Flow | Login + token storage + protected routes | ⏳ Planned |  |
| 🧭 Dashboard | Sidebar + navbar + navigation layout | ⏳ Planned |  |
| 🏘️ Property CRUD | Connect to `/api/properties` | ⏳ Planned |  |
| 👥 Accounts / Categories | CRUD + filtering | ⏳ Planned |  |
| 📊 Analytics Widgets | Real estate statistics visualization | ⏳ Planned |  |

---

## ☁️ **PHASE 4 — INFRASTRUCTURE & DEPLOYMENT**

**Goal:** Containerize and deploy the entire stack with CI/CD integration.

| Milestone | Description | Status | Session |
|------------|--------------|--------|----------|
| 🐳 Dockerization | Dockerfiles for core, re, and frontend | ⏳ Planned |  |
| ⚙️ Docker Compose | Local dev orchestration | ⏳ Planned |  |
| 🚀 CI/CD Setup | GitHub Actions (build/test/deploy) | ⏳ Planned |  |
| ☁️ Azure Deployment | Deploy to Azure VM (port 5000) | ⏳ Planned |  |
| 🔐 Secrets Management | `.env` + Azure Key Vault integration | ⏳ Planned |  |

---

## 🧠 **PHASE 5 — ENHANCEMENTS & OBSERVABILITY**

| Milestone | Description | Status |
|------------|--------------|--------|
| 🩺 Request Metrics | Add SQL query count + execution time to logs | ⏳ Planned |
| 🧾 Swagger / OpenAPI | Document endpoints via `/swagger-ui` | ⏳ Planned |
| 📈 Performance Dashboard | Expose Prometheus-compatible metrics | ⏳ Planned |
| 🧰 Dev Console | Add version endpoint and app info | ⏳ Planned |

---

## 🧾 **Documentation & Governance**

| File | Purpose |
|------|----------|
| `SESSION_TEMPLATE.md` | Template for new development sessions |
| `/docs/progress/*.md` | Individual progress reports |
| `ROADMAP.md` | Long-term tracking of modules and milestones |

---

## 🗓️ **How to Use This File**

1. At the start of each week or session, pick the next milestone from this roadmap.
2. Copy `/docs/SESSION_TEMPLATE.md` → `/docs/progress/progress_YYYY_MM_DD.md`.
3. Update this roadmap with ✅ / ⏳ as milestones evolve.
4. Commit both the code and documentation together.

---

## 📌 **Current Phase**
> **Phase 2 — Real Estate Module (NEXTRA RE)**  
> Active focus: `AccountController`, `CategoryController`, and JWT-secured endpoints.

---

*Maintained by: NEXTRA Core Development Team*  
*Last Updated: {{CURRENT_DATE}}*
