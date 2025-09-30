# Research Grant Application Portal (Demo UI)

A front-end only demonstration of a role‑based Research Grant Application Portal built with **React + TypeScript + Vite + TailwindCSS**. All data is **in-memory mock state** (no backend, database, or file storage). The goal is to showcase **UI clarity**, **role workflows**, and **review stages**.

> NOTE: This is a prototype for presentation / flow validation. Do not use in production without adding authentication, validation, persistence, security, and backend services.

## Tech Stack
- React 18 (Vite + TypeScript)
- React Router v6
- TailwindCSS (custom academic "brand" palette)
- Context API for mock state (users & applications)

## Roles & Dashboards
| Role | Route | Purpose |
|------|-------|---------|
| Applicant | `/applicant` | Submit new applications (mock), view statuses & comments. |
| Committee | `/committee` | Review queue, add comments, approve / deny (forward on approve). |
| Dean | `/dean` | Review committee-approved apps, enter recommendation & allocations, forward. |
| Principal | `/principal` | Final approval / rejection with dean recommendations summary. |
| Admin | `/admin` | Mock user management (CRUD) & overview of all applications. |

Login is performed by selecting a role on the **/login** page; a demo name can be entered. No password.

## Application Lifecycle (Conceptual)
Submitted → Committee Review → Dean Review → Principal Review → Approved / Denied

(Visual stepper removed from Applicant view per request; status still changes in other dashboards.)

## Mock Data
Initial seed includes:
- 5 Users (one per role)
- 1 Sample application already in "Committee Review"

State lives inside `src/data/DataContext.tsx`. Refreshing the browser resets everything.

## Key Files
- `src/main.tsx` – App bootstrap
- `src/App.tsx` – Routes & protected route logic
- `src/data/DataContext.tsx` – All mock state + mutation helpers
- `src/pages/*` – Role dashboards & login
- `src/components/Layout.tsx` – Sidebar + shell
- `tailwind.config.cjs` – Theme customization

## Running (Windows PowerShell)
Install dependencies and start dev server:
```powershell
npm install
npm run dev
```
Then open the printed local URL (default: http://localhost:5173).

### Build Production Bundle
```powershell
npm run build
npm run preview
```

## Feature Overview
### Applicant
- New application form (mock only, no validation yet)
- Upload buttons are placeholders (no storage)
- List of own applications with status + comments

### Committee
- Table queue (Pending + Committee Review)
- Add comments, Approve (forwards to Dean), Deny (terminal)

### Dean
- Inputs: Grant Amount, Publication Incentive, Allocations (First / Corresponding / Co-Author)
- Add comments & Forward to Principal

### Principal
- Read-only view with dean recommendations
- Approve → status = Approved
- Reject → status = Denied

### Admin
- CRUD mock users (in-memory)
- Applications overview table

## Extending This Prototype
| Enhancement | Notes |
|-------------|-------|
| Persistence | Add localStorage sync or real API. |
| Auth | Replace role selector with real auth (JWT/OAuth). |
| Validation | Add form schema (e.g., Zod / Yup). |
| File Upload | Integrate storage (S3/Azure Blob/GCP) service. |
| Notifications | Replace inline messages with toast system. |
| Filtering & Search | Add on Committee / Admin tables. |
| Tests | Add React Testing Library & Vitest unit tests. |
| Accessibility | ARIA labels for action buttons, table headers refinement. |

## Design Tokens (Tailwind)
Custom palette under `brand` (50–900). Reusable utility classes for badges and cards in `src/index.css`.

## Disclaimer
All data ephemeral / mock. No security, no persistence, no authentication. Intended solely for demonstration of UI/flow.

---
Let me know if you’d like any of the suggested enhancements implemented next (persistence, validation, tests, etc.).
# Research Grant Application Portal (UI Demo)

A React + TailwindCSS front-end prototype demonstrating role-based dashboards for a Research Grant / Publication Incentive workflow.

> This is a UI-only mock. No backend, persistence, or real file uploads. All data lives in React state.

## Features
- Role-based login selector (Applicant, Committee, Dean, Principal, Admin)
- Applicant: submit mock application form + view status timeline & comments
- Committee: review queue, approve/deny, add comments
- Dean: recommend grant amounts & allocations, forward to Principal
- Principal: final approve/reject
- Admin: mock user management + applications overview
- Visual status timeline: Submitted → Committee → Dean → Principal → Approved

## Tech Stack
- React 18 + TypeScript + Vite
- TailwindCSS (custom academic palette)
- React Router v6

## Getting Started (Windows PowerShell)

```powershell
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open http://localhost:5173 (default Vite port).

## Usage
1. Choose a role on the login screen and enter a display name.
2. Explore the dashboard corresponding to that role.
3. Switch roles by logging out (sidebar) and logging back in with another role.

## Data Flow (Mock)
All data is stored in-memory inside `DataContext`. Each action mutates React state only. Refreshing the page resets everything.

## Notes & Possible Enhancements
- Add persistence (e.g., localStorage or real API) later.
- Replace inline form arrays with a schema-driven form generator.
- Add pagination & filtering for large application lists.
- Integrate authentication & authorization.
- Add tests (currently omitted for brevity in this demo).

## License
MIT (for demonstration purposes)
