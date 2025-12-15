# HireHub Project Structure

This document provides an overview of the complete HireHub project structure.

## 📊 Project Statistics

- **Total Files:** 74 (excluding node_modules)
- **Client Source Files:** 37
- **Server Source Files:** 13
- **Prisma Schema Files:** 2
- **Languages:** TypeScript (100%)

## 🏗️ Architecture Overview

HireHub follows a **monorepo architecture** using pnpm workspaces with two main packages:

```
hirehub/
├── client/          # React frontend application
├── server/          # Express backend API
├── package.json     # Root workspace configuration
└── pnpm-workspace.yaml
```

## 📁 Detailed Structure

### Root Level

```
hirehub/
├── package.json           # Monorepo configuration with workspace scripts
├── pnpm-workspace.yaml    # pnpm workspace definition
├── pnpm-lock.yaml        # Dependency lock file
├── .gitignore            # Git ignore patterns
└── README.md             # Project documentation
```

**Key Scripts:**
- `pnpm dev` - Run both client and server concurrently
- `pnpm build` - Build both applications
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:seed` - Seed database with demo data

---

### Client (Frontend)

**Tech Stack:**
- React 18.3.1
- TypeScript 5.4.5
- Vite 5.4.21
- TailwindCSS 3.4.19
- React Query (TanStack Query) 5.90.12
- Zustand 4.5.7
- React Router DOM 6.30.2
- @dnd-kit (drag and drop) 6.3.1
- Framer Motion 11.18.2
- Axios 1.13.2
- date-fns 3.6.0
- Lucide React (icons) 0.363.0

#### Client Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Tabs.tsx
│   │   └── jobs/            # Job-specific components
│   │       ├── JobCard.tsx
│   │       ├── JobModal.tsx
│   │       ├── JobTable.tsx
│   │       ├── KanbanBoard.tsx
│   │       └── KanbanColumn.tsx
│   ├── pages/               # Page components
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Jobs.tsx
│   │   ├── Calendar.tsx
│   │   ├── Analytics.tsx
│   │   └── Settings.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useJobs.ts       # React Query hooks for jobs
│   │   ├── useModal.ts      # Modal state management
│   │   └── useAuth.ts       # Auth state (Zustand)
│   ├── services/            # API services
│   │   ├── api.ts           # Axios instance with interceptors
│   │   └── jobs.service.ts  # Job API endpoints
│   ├── store/               # State management
│   │   └── uiStore.ts       # Zustand store for UI state
│   ├── types/               # TypeScript types
│   │   ├── job.types.ts     # Job-related types and enums
│   │   ├── user.types.ts    # User types
│   │   └── api.types.ts     # API response types
│   ├── utils/               # Utility functions
│   │   ├── cn.ts            # Class name merger
│   │   └── format.ts        # Date and currency formatters
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

#### Component Features

**UI Components:**
- **Button:** 5 variants (primary, secondary, outline, ghost, danger), 3 sizes, loading state
- **Modal:** 5 sizes, Framer Motion animations, portal rendering, escape to close
- **Table:** Generic typed table, sortable columns, loading skeleton, empty state
- **Badge:** Status badges with colors, priority dots
- **Card:** Header, body, footer sections
- **Input:** Label, error states, icon support
- **Select:** Dropdown with validation
- **Skeleton:** Loading placeholders
- **Avatar:** Image with fallback
- **Tabs:** Tab navigation with content panels

**Job Components:**
- **JobTable:** Sortable table view with all job details
- **JobModal:** Tabbed modal with Overview, Timeline, Notes, Contacts, Documents
- **KanbanBoard:** Drag-and-drop board with @dnd-kit
- **KanbanColumn:** Droppable column for Kanban
- **JobCard:** Compact job card for Kanban and list views

**Pages:**
- **Dashboard:** Stats cards and recent activity
- **Jobs:** Toggle between table/kanban view, filters, job modal
- **Calendar:** Interview scheduling (placeholder)
- **Analytics:** Charts and insights (placeholder)
- **Settings:** Profile and preferences (placeholder)
- **Login/Signup:** Authentication forms

---

### Server (Backend)

**Tech Stack:**
- Node.js 18+
- Express 4.18.2
- TypeScript 5.3.3
- Prisma 5.22.0 (ORM)
- MongoDB (database)
- Zod 3.22.4 (validation)
- Better-Auth 0.8.0 (authentication - placeholder)
- bcryptjs 2.4.3
- jsonwebtoken 9.0.2
- cors 2.8.5
- helmet 7.1.0

#### Server Structure

```
server/
├── src/
│   ├── controllers/
│   │   └── job.controller.ts    # Job CRUD operations
│   ├── routes/
│   │   ├── job.routes.ts        # Job API routes
│   │   └── user.routes.ts       # User API routes
│   ├── middleware/
│   │   ├── auth.middleware.ts   # Authentication (placeholder)
│   │   ├── error.middleware.ts  # Global error handler
│   │   └── validation.middleware.ts  # Zod validation
│   ├── validations/
│   │   ├── job.validation.ts    # Job schemas
│   │   ├── interview.validation.ts  # Interview schemas
│   │   └── user.validation.ts   # User schemas
│   ├── utils/
│   │   ├── ApiError.ts          # Custom error class
│   │   ├── ApiResponse.ts       # Standard response format
│   │   └── asyncHandler.ts      # Async wrapper
│   └── index.ts                 # Express app entry point
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Database seeding script
├── .env.example                 # Environment variables template
├── package.json
└── tsconfig.json
```

#### Database Schema

The Prisma schema includes:

**Models:**
- User (with embedded UserPreferences)
- Session, Account, Verification (Better-Auth)
- Job (main application tracking)
- Contact
- Interview
- Note
- Document
- Activity (audit log)
- Reminder

**Enums:**
- JobStatus: WISHLIST, APPLIED, SCREENING, INTERVIEW, OFFER, REJECTED
- JobType: FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE
- LocationType: ONSITE, REMOTE, HYBRID
- Priority: LOW, MEDIUM, HIGH
- InterviewType: PHONE, VIDEO, ONSITE, TECHNICAL, BEHAVIORAL, HR, FINAL
- InterviewStatus: SCHEDULED, COMPLETED, CANCELLED, RESCHEDULED
- ActivityType: 10+ activity types
- DocumentType: RESUME, COVER_LETTER, PORTFOLIO, CERTIFICATE, OTHER
- ReminderType: INTERVIEW, FOLLOW_UP, DEADLINE, CUSTOM
- ReminderStatus: PENDING, SENT, DISMISSED

#### Seed Data

The seed script creates:
- **Demo User:** abdullah.demo@gmail.com / demo123456
- **17 Pakistani Tech Companies:**
  1. Systems Limited
  2. 10Pearls
  3. VentureDive
  4. Arbisoft
  5. Folio3
  6. NetSol Technologies
  7. Techlogix
  8. i2c Inc
  9. Contour Software
  10. Nextbridge
  11. Tkxel
  12. Dubizzle Labs
  13. Careem
  14. Daraz
  15. Easypaisa
  16. Jazz
  17. Educative.io
- **25+ Sample Job Applications** across all statuses
- **Sample Interviews** for jobs in interview stage
- **Sample Contacts** for applied jobs
- **Sample Notes** for select jobs
- **Activity Logs** for all jobs

#### API Endpoints

**Jobs:**
- `GET /api/jobs` - List all jobs with filters
- `GET /api/jobs/:id` - Get single job with details
- `POST /api/jobs` - Create new job
- `PATCH /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `PATCH /api/jobs/:id/status` - Update job status
- `GET /api/jobs/:jobId/contacts` - Get job contacts
- `POST /api/jobs/:jobId/contacts` - Add contact
- `GET /api/jobs/:jobId/notes` - Get job notes
- `POST /api/jobs/:jobId/notes` - Add note
- `GET /api/jobs/:jobId/activities` - Get activity log

**Users:**
- `GET /api/users/profile` - Get user profile
- `GET /api/users/stats` - Get dashboard statistics

---

## 🔒 Security Features

- ✅ **Helmet** - Security headers
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Zod Validation** - Input validation
- ✅ **MongoDB ObjectId Validation** - Prevents injection
- ✅ **Error Handling** - Consistent error responses
- ✅ **TypeScript Strict Mode** - Type safety
- ✅ **No Security Vulnerabilities** - CodeQL scan passed

**Note:** Authentication middleware is currently a placeholder and requires Better-Auth integration before production use.

---

## 📦 Dependencies Summary

### Client Dependencies (14)
- react, react-dom
- react-router-dom
- @tanstack/react-query
- zustand
- @dnd-kit (core, sortable, utilities)
- framer-motion
- react-hook-form
- axios
- date-fns
- clsx
- lucide-react

### Server Dependencies (11)
- express, cors, helmet, morgan
- @prisma/client
- better-auth
- zod
- bcryptjs
- jsonwebtoken
- dotenv

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- MongoDB 7.0+

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Setup environment variables:**
   - Copy `.env.example` files in both client and server
   - Update with your values

3. **Generate Prisma client:**
   ```bash
   pnpm db:generate
   ```

4. **Push schema to database:**
   ```bash
   pnpm db:push
   ```

5. **Seed database:**
   ```bash
   pnpm db:seed
   ```

6. **Start development:**
   ```bash
   pnpm dev
   ```

### Build for Production

```bash
pnpm build
```

This builds both client and server.

---

## ✅ Quality Assurance

- ✅ TypeScript compilation: **0 errors**
- ✅ Code review: **Completed, all feedback addressed**
- ✅ Security scan: **0 vulnerabilities**
- ✅ Client build: **Success**
- ✅ Server build: **Success**

---

## 📝 Next Steps

1. **Authentication:**
   - Integrate Better-Auth properly
   - Replace auth middleware placeholder

2. **Environment Configuration:**
   - Set up MongoDB connection
   - Configure environment variables

3. **Feature Development:**
   - Implement remaining CRUD operations
   - Add file upload for documents
   - Build analytics dashboard
   - Implement calendar view
   - Add email notifications

4. **Testing:**
   - Add unit tests
   - Add integration tests
   - Add E2E tests

5. **Deployment:**
   - Configure CI/CD
   - Deploy to production
   - Set up monitoring

---

## 📄 License

MIT License - See LICENSE file for details.

---

**Built with ❤️ for the Pakistani tech community**
