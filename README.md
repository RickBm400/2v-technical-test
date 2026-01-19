# 2V - Technical Test

A full-stack web application for managing debts between users. Built with modern technologies for a scalable and maintainable codebase.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)

---

## 🚀 Quick Start

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm start

# Or run separately
npm run dev:frontend  # Port 5173
npm run dev:backend   # Port 3000
```

---

## 📁 Project Structure

```
├── 2v-technical-test/
│   ├── 2v-debts-client/
│   │   ├── public/
│   │   └── src/
│   │       ├── assets/
│   │       ├── components/
│   │       ├── context/
│   │       ├── layouts/
│   │       ├── network/
│   │       │   └── queries/
│   │       ├── pages/
│   │       │   └── Dashboard/
│   │       │       └── Debts/
│   │       │           └── components/
│   │       ├── router/
│   │       ├── store/
│   │       ├── types/
│   │       └── utils/
│   └── 2v-debts-server/
│       ├── prisma/
│       └── src/
│           ├── application/
│           ├── domain/
│           │   └── entities/
│           ├── infrastructure/
│           │   ├── database/
│           │   ├── repository/
│           │   ├── security/
│           │   ├── utils/
│           │   └── web/
│           │       ├── controllers/
│           │       ├── middlewares/
│           │       └── routes/
│           ├── shared/
│           └── __test__/
│
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

### **Frontend**

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.2.4 | Build tool & dev server |
| React Router | 7.12.0 | Client-side routing |
| React Query | 5.90.19 | Server state management |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.1.18 | Utility-first styling |
| Ant Design | 6.2.0 | Component library |
| Axios | 1.13.2 | HTTP client |
| MDI Icons | 7.4.47 | Icon library |

### **Backend**

| Technology | Version | Purpose |
|-----------|---------|---------|
| Express | 5.2.1 | Web framework |
| Node.js | Latest | Runtime environment |
| TypeScript | 5.9.3 | Type safety |
| Prisma | 7.2.0 | ORM & database toolkit |
| PostgreSQL | - | Relational database |
| JWT | 9.0.3 | Authentication |
| Bcrypt | 6.0.0 | Password hashing |
| CORS | 2.8.5 | Cross-origin requests |
| Jest | 30.2.0 | Testing framework |

---

## ✨ Features

### **Frontend Features**

#### 🔐 Authentication
- **JWT-based Authentication** - Secure token storage in localStorage
  - *Why:* Industry standard for stateless authentication, secure and scalable
- **Protected Routes** - Route guards prevent unauthorized access
  - *Why:* Ensures sensitive data is only accessible to authenticated users
- **Automatic Redirects** - Redirects based on token presence
  - *Why:* Better UX, users are automatically routed to appropriate pages

#### 📊 Debt Management
- **Paginated Debt List** - Display debts with configurable page sizes (5, 10, 20, 50)
  - *Why:* Improves performance, better UX with large datasets
- **Status Filtering** - Filter debts by status (All, Pending, Completed)
  - *Why:* Helps users find relevant debts quickly
- **Search Functionality** - Search debts by title/description
  - *Why:* Essential for UX in data-heavy applications
- **Real-time Updates** - React Query auto-refetch on data changes
  - *Why:* Automatic cache invalidation, ensures fresh data

#### 🎨 UI/UX
- **Responsive Design** - Mobile, tablet, and desktop support
  - *Why:* Tailwind CSS provides utility-first approach for consistent styling
- **Ant Design Components** - Pre-built, accessible UI components
  - *Why:* Saves development time, ensures accessibility standards
- **Modal Forms** - Create debt modal with validation
  - *Why:* Better UX than page navigation for quick actions
- **Status Tags** - Visual status indicators
  - *Why:* Improves scanability and quick information processing

#### 🔄 State Management
- **React Query** - Server state caching and synchronization
  - *Why:* Eliminates manual state management, built-in refetch strategies
- **Context API** - Share UI state (modals, timelines)
  - *Why:* Lightweight, no external dependencies for simple global state

#### 🌐 API Integration
- **Axios Client** - Centralized HTTP requests with interceptors
  - *Why:* Easier error handling, automatic token injection
- **Query Parameters** - Dynamic filtering and pagination
  - *Why:* Restful API, enables bookmark-friendly URLs

---

### **Backend Features**

#### 🔐 Security
- **JWT Authentication** - Token-based user verification
  - *Why:* Stateless, scales well, industry standard
- **Password Hashing** - Bcrypt with salt rounds
  - *Why:* Secure password storage, resistant to rainbow table attacks
- **CORS Protection** - Whitelist allowed origins
  - *Why:* Prevents unauthorized cross-origin requests
- **Error Handler Middleware** - Centralized error management
  - *Why:* Consistent error responses, easier debugging

#### 📚 Architecture
- **Repository Pattern** - Abstraction layer for data access
  - *Why:* Decouples business logic from database, easier testing
- **Use Case Layer** - Business logic separation
  - *Why:* Clean architecture, single responsibility principle
- **Middleware Stack** - Async error handling, authentication, validation
  - *Why:* DRY principle, reusable middleware across routes
- **TypeScript** - Strong typing throughout codebase
  - *Why:* Catches errors at compile time, improves IDE support

#### 💾 Database
- **Prisma ORM** - Type-safe database client
  - *Why:* Auto-generated types, type-safe queries, easy migrations
- **PostgreSQL** - Relational database
  - *Why:* ACID compliance, advanced features, scalability
- **Schema Validation** - Database constraints
  - *Why:* Data integrity at database level

#### 🔄 API Endpoints
- **User Authentication** - Register, login endpoints
- **Debt CRUD** - Create, read, update, delete debts
- **Pagination & Filtering** - Support for status, search, page size
- **Error Responses** - Consistent error format with status codes
  - *Why:* Frontend can easily handle and display errors

#### 🧪 Testing
- **Jest** - Unit testing framework
  - *Why:* Industry standard, great TypeScript support
- **Async Handler Testing** - Test async route handlers
  - *Why:* Catch promise rejection errors, prevent uncaught errors

#### 📈 Developer Experience
- **Hot Reload** - Auto-restart on file changes (tsx --watch)
  - *Why:* Faster development feedback loop
- **Debug Mode** - Node inspector support
  - *Why:* Better debugging capabilities with browser DevTools
- **TypeScript Config** - Strict mode enabled
  - *Why:* Catches more potential errors during development

---

## 📦 Installation

### Prerequisites
- Node.js 22+
- npm or yarn
- PostgreSQL database

### Setup Steps

```bash
# 1. Clone and navigate to project
cd 2v-technical-test

# 2. Install all dependencies
npm run install:all

# 3. Setup environment variables
# Create .env file in 2v-debts-server/
DATABASE_URL="postgresql://user:password@localhost:5432/debts_db"
JWT_SECRET="your-secret-key"
PORT=3000

# 4. Setup database
cd 2v-debts-server
npx prisma migrate dev

# 5. Return to root
cd ..
```

---

## ▶️ Running the Application

### Development Mode (Recommended)

```bash
# Start both frontend and backend concurrently
npm start
```

**Output:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

### Individual Services

```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend

# Terminal 3 - Backend with debug
cd 2v-debts-server && npm run debug
```

### Production Build

```bash
# Frontend
cd 2v-debts-client
npm run build

# Backend
cd ../2v-debts-server
npm run build
npm start
```

---

## 🧪 Testing

```bash
# Run backend tests
cd 2v-debts-server
npm test

# Watch mode
npm run test:debug
```

---

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/debts_db
JWT_SECRET=your-jwt-secret-key
PORT=3000
NODE_ENV=development
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push and create a pull request

---

## 📄 License

ISC

---

## 👨‍💻 Author

RickBM400
