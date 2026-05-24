# Smart Workforce Hub

> Enterprise employee management and productivity platform for large organizations — built with Spring Boot, React, and AI-powered workflows.

![Version](https://img.shields.io/badge/version-1.0.0-6366f1)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6db33f)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Table of contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech stack](#tech-stack)
4. [Architecture](#architecture)
5. [Project structure](#project-structure)
6. [Prerequisites](#prerequisites)
7. [Getting started](#getting-started)
   - [Option A — Docker (recommended)](#option-a--docker-recommended)
   - [Option B — Manual setup](#option-b--manual-setup)
8. [Environment variables](#environment-variables)
9. [Database](#database)
10. [API documentation](#api-documentation)
11. [Authentication](#authentication)
12. [Role-based access](#role-based-access)
13. [AI features](#ai-features)
14. [Demo accounts](#demo-accounts)
15. [Running tests](#running-tests)
16. [Deployment](#deployment)
17. [Contributing](#contributing)
18. [Roadmap](#roadmap)

---

## Overview

Smart Workforce Hub is a full-stack enterprise SaaS platform designed for internal HR, operations, and project teams. It combines employee lifecycle management, task tracking, real-time notifications, and an AI assistant into a single, unified dashboard — similar in scope to tools used by consulting and professional services firms.

The platform is role-aware (Admin / Manager / Employee), fully responsive, supports dark and light mode, and ships with AI-powered search, summarization, and a streaming HR chatbot backed by the OpenAI API.

---

## Features

### Authentication & security
- JWT access tokens (15-minute expiry) + rotating refresh tokens (7-day expiry)
- BCrypt password hashing
- Account lockout after repeated failed login attempts
- Role-based access control (RBAC) with Spring Security `@PreAuthorize`
- Secure token storage; refresh token hashes stored — never raw tokens

### Dashboard & analytics
- KPI cards: total employees, active today, tasks completed, departments
- Department headcount pie chart
- Weekly attendance bar chart
- Monthly performance trend line chart
- Recent activity feed

### Employee management
- Full CRUD with department and manager assignment
- Skill tagging with proficiency levels (Beginner → Expert)
- Employment status tracking (Active, On Leave, Probation, Terminated)
- Profile photo upload
- Debounced search + multi-filter (department, status, employment type)
- Paginated and sortable list; infinite scroll alternative
- Individual employee profile page with AI-generated summary

### Task & project management
- Kanban board with drag-and-drop (dnd-kit)
- Optimistic UI updates with automatic rollback on failure
- Task priority levels: Critical, High, Medium, Low
- Status workflow: Pending → In Progress → In Review → Completed
- Subtask support (parent–child task hierarchy)
- File attachments and tags
- Activity timeline on every task
- Scheduled deadline alerts (24-hour advance notification)

### AI assistant
- Floating chat interface with streaming responses (Server-Sent Events)
- HR chatbot: leave policies, onboarding questions, company information
- AI-powered natural language employee search
- One-click AI summary generation on employee profiles and task pages
- Global command palette (Cmd+K) with AI search mode
- Per-user rate limiting (10 requests/minute) to manage OpenAI costs

### Notifications
- Real-time delivery via SSE (no polling)
- Notification types: task assigned, deadline approaching, status changed, announcements
- Unread count badge with mark-as-read and mark-all-read
- Role-scoped notifications (Admins see system-wide; Employees see their own)

### Settings & profile
- Edit profile: name, bio, photo, phone
- Change password with current-password verification
- Theme toggle: light / dark / system
- Notification preferences (email, push)
- Timezone and date format settings

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| State — server | TanStack Query (React Query) v5 |
| State — client | Redux Toolkit |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animations | Framer Motion |
| Drag and drop | @dnd-kit/core |
| Backend framework | Spring Boot 3.2 (Java 17) |
| Security | Spring Security + JJWT |
| Persistence | Spring Data JPA + Hibernate |
| Database | PostgreSQL 15 |
| Migrations | Liquibase |
| API docs | SpringDoc OpenAPI / Swagger UI |
| AI | OpenAI API (gpt-4o) |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Browser client                      │
│   React + TypeScript + Vite  (port 5173 / 80 in prod)   │
└────────────────────────┬────────────────────────────────┘
                         │  REST + SSE
┌────────────────────────▼────────────────────────────────┐
│              Spring Boot API server (port 8080)          │
│                                                          │
│  Controllers → Services → Repositories → DTOs           │
│  Spring Security (JWT filter chain)                      │
│  Global exception handler                               │
│  OpenAI proxy (rate-limited)                            │
│  Scheduled jobs (deadline alerts, token cleanup)        │
└──────────┬────────────────────────────┬─────────────────┘
           │                            │
┌──────────▼──────┐          ┌──────────▼──────────────┐
│  PostgreSQL 15  │          │    OpenAI API (external) │
│  (port 5432)   │          │    gpt-4o + embeddings   │
└─────────────────┘          └──────────────────────────┘
```

### Backend layer structure

```
controller      HTTP entry point; request mapping; auth guards
service         Business logic; transaction boundaries
repository      Spring Data JPA interfaces
entity          JPA-mapped domain objects
dto             Request/response shapes (no entity leakage)
mapper          Entity ↔ DTO conversion (MapStruct)
exception       Custom exceptions + GlobalExceptionHandler
security        JwtService, JwtAuthFilter, SecurityConfig
config          AppConfig, OpenApiConfig, SchedulerConfig
```

---

## Project structure

```
smart-workforce-hub/
│
├── backend/                        Spring Boot application
│   ├── src/main/java/com/swh/
│   │   ├── auth/                   Authentication (controller, service, dto)
│   │   ├── user/                   User management
│   │   ├── employee/               Employee CRUD and profile
│   │   ├── department/             Department management
│   │   ├── task/                   Task and project management
│   │   ├── notification/           Notification service + SSE
│   │   ├── analytics/              Dashboard aggregation endpoints
│   │   ├── ai/                     OpenAI proxy + rate limiting
│   │   ├── activitylog/            Audit trail
│   │   ├── common/                 Shared DTOs, base entities, utils
│   │   ├── config/                 Spring configs (Security, OpenAPI, etc.)
│   │   └── exception/              Custom exceptions + global handler
│   │
│   └── src/main/resources/
│       ├── application.yml         Base config
│       ├── application-dev.yml     Development overrides
│       ├── application-prod.yml    Production overrides
│       └── db/changelog/
│           ├── db.changelog-master.xml
│           └── changes/            Individual migration SQL files
│
├── frontend/                       Vite + React application
│   ├── src/
│   │   ├── app/                    App entry, router, providers
│   │   ├── features/               Feature slices (auth, employees, tasks, ai…)
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── employees/
│   │   │   ├── tasks/
│   │   │   ├── notifications/
│   │   │   ├── ai/
│   │   │   └── settings/
│   │   ├── components/
│   │   │   ├── ui/                 Design system: Button, Input, Modal, Badge…
│   │   │   ├── layout/             AppShell, Sidebar, Topbar
│   │   │   └── shared/             DataTable, SkeletonLoader, EmptyState…
│   │   ├── hooks/                  useAuth, useDebounce, useNotifications…
│   │   ├── services/               Axios instances + API service functions
│   │   ├── store/                  Redux slices (auth, ui, notifications)
│   │   ├── types/                  TypeScript interfaces and enums
│   │   └── utils/                  Date formatting, validators, constants
│   │
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── database/
│   ├── schema.sql                  Full schema (reference copy)
│   └── seed.sql                    Demo seed data
│
├── docker-compose.yml              Development stack
├── docker-compose.prod.yml         Production stack
└── README.md
```

---

## Prerequisites

| Tool | Minimum version | Check |
|---|---|---|
| Docker | 24.x | `docker --version` |
| Docker Compose | 2.x | `docker compose version` |
| Java JDK | 17 | `java -version` |
| Node.js | 18 | `node --version` |
| pnpm | 8 | `pnpm --version` |
| PostgreSQL client (optional) | 15 | `psql --version` |

You need an **OpenAI API key** for the AI features. The rest of the application works without one — AI endpoints will return a `503` gracefully.

---

## Getting started

### Option A — Docker (recommended)

The fastest way to get the full stack running locally.

**1. Clone the repository**

```bash
git clone https://github.com/your-org/smart-workforce-hub.git
cd smart-workforce-hub
```

**2. Create your environment file**

```bash
cp .env.example .env
```

Open `.env` and fill in the required values (see [Environment variables](#environment-variables)). At minimum you need `OPENAI_API_KEY` and a `JWT_SECRET`.

**3. Start the stack**

```bash
docker compose up --build
```

This starts:
- PostgreSQL on `localhost:5432`
- Spring Boot API on `localhost:8080`
- Vite dev server on `localhost:5173`
- pgAdmin on `localhost:5050` (optional, for DB inspection)

**4. Seed demo data**

On first startup, the `seed` Spring profile loads automatically if `SEED_DATA=true` is set in `.env`. To run manually:

```bash
docker compose exec api ./gradlew bootRun --args='--spring.profiles.active=seed'
```

**5. Open the app**

```
http://localhost:5173
```

Log in with any [demo account](#demo-accounts).

---

### Option B — Manual setup

#### Backend

```bash
cd backend

# Copy and edit config
cp src/main/resources/application-dev.yml.example src/main/resources/application-dev.yml

# Start PostgreSQL separately (or use docker compose up postgres)
docker compose up postgres -d

# Run migrations (Liquibase runs automatically on startup)
./gradlew bootRun --args='--spring.profiles.active=dev'
```

The API starts at `http://localhost:8080`.  
Swagger UI is at `http://localhost:8080/api/docs`.

#### Frontend

```bash
cd frontend

# Install dependencies
pnpm install

# Copy and edit environment
cp .env.local.example .env.local

# Start dev server
pnpm dev
```

The frontend starts at `http://localhost:5173`.

---

## Environment variables

### Root `.env` (used by Docker Compose)

```env
# Database
POSTGRES_DB=swh_db
POSTGRES_USER=swh_user
POSTGRES_PASSWORD=your_secure_password

# JWT — generate with: openssl rand -base64 64
JWT_SECRET=your_long_random_secret_here
JWT_ACCESS_EXPIRY_MS=900000       # 15 minutes
JWT_REFRESH_EXPIRY_MS=604800000   # 7 days

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=1000

# App
SEED_DATA=true                    # load demo data on first run
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend `frontend/.env.local`

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Smart Workforce Hub
```

### Backend `application-prod.yml` overrides

```yaml
spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
  liquibase:
    enabled: true

app:
  jwt:
    secret: ${JWT_SECRET}
  openai:
    api-key: ${OPENAI_API_KEY}
  cors:
    allowed-origins: ${CORS_ALLOWED_ORIGINS}
```

---

## Database

The schema is managed by **Liquibase**. Migrations run automatically when the Spring Boot application starts.

### Running migrations manually

```bash
cd backend
./gradlew liquibaseUpdate
```

### Rolling back the last migration

```bash
./gradlew liquibaseRollback -PliquibaseCommandValue=1
```

### Resetting the database (development only)

```bash
docker compose down -v          # removes the postgres volume
docker compose up postgres -d
./gradlew bootRun --args='--spring.profiles.active=dev,seed'
```

### Schema overview

| Table | Purpose |
|---|---|
| `users` | Authentication identities |
| `roles` / `user_roles` | RBAC role assignment |
| `refresh_tokens` | JWT refresh token registry |
| `departments` | Organizational hierarchy |
| `employees` | Extended employee profiles |
| `skills` / `employee_skills` | Skill tagging with proficiency |
| `projects` / `project_members` | Project grouping |
| `tasks` / `task_comments` | Work item tracking |
| `attendance` | Daily check-in/check-out records |
| `leave_requests` | Leave application workflow |
| `notifications` | In-app notification inbox |
| `activity_logs` | Immutable audit trail |
| `user_preferences` | Per-user UI settings |
| `ai_chat_history` | AI conversation history |

See [`database/schema.sql`](database/schema.sql) for the full DDL including indexes, triggers, views, and constraints.

---

## API documentation

Swagger UI is available at:

```
http://localhost:8080/api/docs
```

OpenAPI JSON spec:

```
http://localhost:8080/api/docs.json
```

### Key endpoint groups

| Prefix | Description |
|---|---|
| `POST /api/auth/...` | Login, register, refresh, logout |
| `GET/POST/PUT/DELETE /api/employees` | Employee CRUD |
| `GET/POST/PUT/DELETE /api/tasks` | Task management |
| `GET/POST/PUT/DELETE /api/projects` | Project management |
| `GET /api/departments` | Department list and tree |
| `GET /api/analytics/...` | Dashboard KPI and chart data |
| `GET /api/notifications` | Notification inbox |
| `GET /api/notifications/stream` | SSE real-time stream |
| `POST /api/ai/chat` | AI chatbot (streaming) |
| `POST /api/ai/summarize` | AI summary generation |
| `POST /api/ai/search` | AI-powered natural language search |
| `GET/PUT /api/users/profile` | User profile management |

### Example: log in and make an authenticated request

```bash
# 1. Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@swh.com","password":"Password@123"}'

# Response:
# { "accessToken": "eyJ...", "refreshToken": "...", "user": { ... } }

# 2. Use the token
curl http://localhost:8080/api/employees?page=0&size=20 \
  -H "Authorization: Bearer eyJ..."
```

---

## Authentication

The application uses a two-token JWT strategy:

- **Access token** — short-lived (15 min), sent in the `Authorization: Bearer` header on every API request.
- **Refresh token** — long-lived (7 days), stored as an httpOnly cookie. Used to obtain a new access token when the current one expires. The old refresh token is revoked on rotation.

The frontend Axios instance handles token refresh automatically via a response interceptor — the user is never logged out due to token expiry during an active session.

```
POST /api/auth/login       → returns accessToken + sets refreshToken cookie
POST /api/auth/refresh     → rotates refresh token, returns new accessToken
POST /api/auth/logout      → revokes refresh token server-side
```

---

## Role-based access

| Feature | Admin | Manager | Employee |
|---|:---:|:---:|:---:|
| View all employees | ✓ | ✓ | own only |
| Create / edit employees | ✓ | dept only | — |
| Delete employees | ✓ | — | — |
| View all tasks | ✓ | ✓ | assigned only |
| Create / assign tasks | ✓ | ✓ | — |
| Delete tasks | ✓ | — | — |
| Manage departments | ✓ | — | — |
| View analytics dashboard | ✓ | dept only | — |
| Use AI assistant | ✓ | ✓ | ✓ |
| Manage all users | ✓ | — | — |
| System notifications | ✓ | — | — |

---

## AI features

All AI features proxy through the backend — the OpenAI API key is never exposed to the client.

### Chatbot

The floating assistant (bottom-right of the screen) accepts natural language questions about HR policies, employee information, and task status. Responses stream token-by-token via Server-Sent Events.

System prompt is injected server-side with company context, role of the asking user, and current date. Conversation history is maintained in the session and optionally persisted to `ai_chat_history`.

### Smart search

Accessible via the global command palette (`Cmd+K` / `Ctrl+K`). In AI mode, a natural language query like *"engineers hired this year with React skills"* is sent to the backend, which uses GPT-4o to extract filter intent and runs a structured database query — returning results alongside a plain-English explanation of what was searched.

### AI summaries

Available on employee profile pages and task detail pages via a "Generate AI summary" button. The backend fetches the relevant entity data, constructs a prompt, and streams a prose summary back to the frontend.

### Rate limiting

AI endpoints are rate-limited to **10 requests per user per minute** using a sliding window counter backed by an in-memory cache. Exceeding the limit returns `429 Too Many Requests` with a `Retry-After` header.

---

## Demo accounts

All demo accounts use the password: **`Password@123`**

| Email | Role | Access |
|---|---|---|
| `admin@swh.com` | Admin | Full system access |
| `manager@swh.com` | Manager | Engineering department |
| `emp1@swh.com` | Employee | Self-service only |
| `emp2@swh.com` | Employee | Self-service only |
| `emp3@swh.com` | Employee | Self-service only |

---

## Running tests

### Backend

```bash
cd backend

# All tests
./gradlew test

# Unit tests only
./gradlew test --tests "com.swh.*.unit.*"

# Integration tests only
./gradlew test --tests "com.swh.*.integration.*"

# With coverage report (output: build/reports/jacoco/)
./gradlew test jacocoTestReport
```

### Frontend

```bash
cd frontend

# Unit tests (Vitest)
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### End-to-end tests (Playwright)

```bash
cd frontend

# Install browsers (first time only)
pnpm exec playwright install

# Run all E2E tests (requires the full stack running)
pnpm test:e2e

# Run with browser UI visible
pnpm test:e2e --headed

# Run a specific test file
pnpm test:e2e tests/auth.spec.ts
```

The E2E suite covers: login → dashboard → employee CRUD → task assignment → AI chat → logout.

---

## Deployment

### Production Docker build

```bash
# Build and start the production stack
docker compose -f docker-compose.prod.yml up --build -d

# View logs
docker compose -f docker-compose.prod.yml logs -f api

# Stop
docker compose -f docker-compose.prod.yml down
```

The production compose file uses:
- Multi-stage Dockerfile for the Spring Boot JAR (openjdk:17-slim final image)
- Nginx serving the Vite static build on port 80 with SPA fallback
- Environment variables only — no hardcoded secrets
- Health checks on the API container before the frontend is considered ready

### Deploying to a cloud provider

The application is tested on **Railway**, **Render**, and **Fly.io**. General steps:

1. Push your repository to GitHub.
2. Create a PostgreSQL service on your provider; copy the connection string.
3. Set all environment variables from the [Environment variables](#environment-variables) section in the provider dashboard.
4. Connect the repository and deploy. The provider builds from `docker-compose.prod.yml` or individual Dockerfiles.

### GitHub Actions CI/CD

The `.github/workflows/ci.yml` pipeline runs on every push and pull request to `main`:

```
Lint (frontend) → Unit tests (backend + frontend) → Docker build → Push to registry → Deploy
```

Required GitHub secrets:

```
DOCKER_HUB_USERNAME
DOCKER_HUB_TOKEN
DEPLOY_SSH_HOST
DEPLOY_SSH_USER
DEPLOY_SSH_KEY
JWT_SECRET
OPENAI_API_KEY
DB_PASSWORD
```

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Follow the coding conventions in `CONTRIBUTING.md`.
3. Write or update tests for any changed functionality.
4. Ensure `pnpm lint`, `./gradlew test`, and `pnpm test:e2e` all pass locally.
5. Open a pull request with a clear description of what changed and why.

### Commit message format

```
type(scope): short description

feat(employees): add bulk status update endpoint
fix(auth): handle refresh token race condition on parallel requests
chore(deps): upgrade Spring Boot to 3.2.5
docs(api): add request examples to employee endpoints
```

---

## Roadmap

- [ ] WebSocket upgrade for bi-directional real-time collaboration
- [ ] Performance reviews and 360-degree feedback module
- [ ] Payroll integration (export to Razorpay/Zoho Payroll)
- [ ] Multi-tenancy: organization-scoped data isolation
- [ ] Mobile app (React Native, shared API)
- [ ] AI-generated weekly team digest email
- [ ] Okta / Azure AD SSO via SAML 2.0
- [ ] Exportable analytics reports (PDF / Excel)
- [ ] Zapier/webhook integration for external automation

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built for enterprise teams who deserve better internal tooling.
</p>
