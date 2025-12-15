# 🎯 HireHub

> A comprehensive job application tracker built specifically for the Pakistani job market

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-47A248.svg)](https://www.mongodb.com/)

HireHub is a modern, full-stack job application tracking system designed to help job seekers in Pakistan manage their job search effectively. Track applications, schedule interviews, manage contacts, and gain insights into your job search journey.

---

## ✨ Features

- 📊 **Dashboard Analytics** - Get insights into your application statistics and trends
- 🗂️ **Application Tracking** - Track jobs across multiple stages: Wishlist, Applied, Screening, Interview, Offer, Rejected
- 📋 **Kanban Board** - Drag-and-drop interface powered by @dnd-kit for intuitive job management
- 📅 **Interview Calendar** - Never miss an interview with built-in scheduling
- 📝 **Notes & Documents** - Attach notes and documents to each application
- 👥 **Contact Management** - Keep track of recruiters and hiring managers
- 🔔 **Reminders** - Get notified about upcoming interviews and follow-ups
- 📈 **Analytics** - Visualize your job search progress with charts and graphs
- 🌙 **Dark Mode** - Eye-friendly dark theme support
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🇵🇰 **Pakistani Market Focus** - Pre-seeded with major Pakistani tech companies

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **Data Fetching:** React Query (TanStack Query)
- **Drag & Drop:** @dnd-kit
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Prisma ORM (< v7)
- **Authentication:** Better-Auth
- **Validation:** Zod
- **Security:** Helmet, CORS

### Development Tools
- **Package Manager:** pnpm (workspaces)
- **Build Tool:** Vite (Frontend), tsc (Backend)
- **Code Quality:** ESLint, Prettier

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **pnpm** 8 or higher ([Installation Guide](https://pnpm.io/installation))
- **MongoDB** 7.0 or higher (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/abdullah129/hirehub.git
cd hirehub
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

#### Client Environment Variables

Create `/client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=HireHub
```

#### Server Environment Variables

Create `/server/.env`:

```env
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/hirehub?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=development

# Authentication (Better-Auth)
BETTER_AUTH_SECRET=your-super-secret-key-change-this-in-production
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Important:** Replace the `DATABASE_URL` with your actual MongoDB connection string and generate a secure random string for `BETTER_AUTH_SECRET`.

### 4. Database Setup

Generate Prisma client and push schema to database:

```bash
pnpm db:generate
pnpm db:push
```

### 5. Seed Database (Optional)

Populate your database with sample data including Pakistani tech companies:

```bash
pnpm db:seed
```

This creates:
- Demo user: `abdullah.demo@gmail.com` / `demo123456`
- 25+ sample job applications
- Pakistani companies: Systems Limited, 10Pearls, VentureDive, Arbisoft, Folio3, NetSol, and more
- Sample interviews, notes, and contacts

### 6. Start Development Servers

Run both frontend and backend concurrently:

```bash
pnpm dev
```

Or run them separately:

```bash
# Terminal 1 - Frontend
pnpm dev:client

# Terminal 2 - Backend
pnpm dev:server
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 📁 Project Structure

```
hirehub/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI components (Button, Modal, Table, etc.)
│   │   │   └── jobs/      # Job-specific components (JobTable, KanbanBoard, etc.)
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── store/         # Zustand state management
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── validations/   # Zod validation schemas
│   │   └── utils/         # Utility functions
│   ├── prisma/
│   │   ├── schema.prisma  # Prisma schema
│   │   └── seed.ts        # Database seed script
│   └── package.json
│
├── package.json           # Root package.json (monorepo)
├── pnpm-workspace.yaml    # pnpm workspace configuration
└── README.md
```

---

## 🔐 Environment Variables

### Client Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `HireHub` |

### Server Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection string | ✅ Yes |
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `BETTER_AUTH_SECRET` | Secret key for authentication | ✅ Yes |
| `BETTER_AUTH_URL` | Backend URL for auth | ✅ Yes |
| `CLIENT_URL` | Frontend URL for CORS | ✅ Yes |

---

## 🎨 Available Scripts

### Root Level

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run both client and server in development mode |
| `pnpm dev:client` | Run only the frontend |
| `pnpm dev:server` | Run only the backend |
| `pnpm build` | Build both client and server for production |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push Prisma schema to database |
| `pnpm db:seed` | Seed database with sample data |

### Client

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

### Server

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start server with nodemon |
| `pnpm build` | Compile TypeScript |
| `pnpm start` | Run compiled server |
| `pnpm lint` | Run ESLint |

---

## 📸 Screenshots

> 📷 Screenshots coming soon...

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abdullah**

- GitHub: [@abdullah129](https://github.com/abdullah129)

---

## 🙏 Acknowledgments

- Built with ❤️ for the Pakistani tech community
- Inspired by modern job tracking solutions
- Special thanks to all open-source contributors

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainer

---

**Happy Job Hunting! 🎯**
