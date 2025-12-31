# 🦜 Blurt API

> A production-grade, scalable backend for a Twitter-like social media platform built with modern TypeScript architecture.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

---

## 📖 Overview

Blurt API is a fully-featured social media backend designed with scalability and maintainability in mind. Built using Domain-Driven Design principles, it provides a robust foundation for real-time social interactions, content distribution, and user management.

### Why Blurt?

- **🎯 Production-Ready**: Industry-standard authentication, error handling, and security practices
- **📈 Scalable Architecture**: Cursor-based pagination and optimized database queries
- **🔒 Type-Safe**: End-to-end TypeScript with Prisma-generated types
- **🐳 Cloud-Native**: Fully containerized for easy deployment
- **🧩 Modular Design**: Clean separation of concerns with DDD patterns

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js v20 |
| **Language** | TypeScript |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | JWT + Argon2 |
| **Containerization** | Docker |
| **Architecture** | DDD + Service Layer Pattern |

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login
- Password hashing with Argon2
- JWT-based stateless authentication
- Protected routes with middleware validation

### 🐦 Tweet Management
- Create and publish tweets
- Personalized timeline feeds
- Optimized query performance

### 📜 Smart Pagination
- Cursor-based infinite scroll
- No "page drift" issues
- Efficient for large datasets

### 🤝 Social Graph
- Follow/Unfollow users
- Complex relationship queries
- Feed personalization based on follows

### 🛡 Type Safety
- Compile-time type checking
- Auto-generated Prisma types
- Reduced runtime errors

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v12+ (Local or Cloud instance)
- **Docker Desktop** (Optional, for containerization)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd blurt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```bash
   PORT=4000
   DATABASE_URL="postgresql://user:password@localhost:5432/blurt_db?schema=public"
   JWT_SECRET="your_super_secret_key_here_change_in_production"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Run migrations
   npx prisma migrate dev --name init
   
   # Generate Prisma Client
   npx prisma generate
   ```

5. **Seed the database** (Optional but recommended)
   ```bash
   npx prisma db seed
   ```
   This populates your database with sample users and tweets for testing.

6. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:4000`

---

## 🐳 Docker Deployment

### Building the Image

```bash
docker build -t blurt-api:latest .
```

### Running with Docker Compose

For a complete setup with PostgreSQL:

```bash
docker-compose up -d
```

### Production Deployment

```bash
# Build production image
docker build -t blurt-api:prod --target production .

# Run container
docker run -p 4000:4000 \
  -e DATABASE_URL="your_production_db_url" \
  -e JWT_SECRET="your_production_secret" \
  blurt-api:prod
```

---

## 📂 Project Architecture

```
src/
├── controllers/         # HTTP request handlers
│   ├── auth.controller.ts
│   ├── tweet.controller.ts
│   └── user.controller.ts
│
├── services/           # Business logic layer
│   ├── auth/          # Authentication services
│   ├── tweet/         # Tweet management
│   └── user/          # User operations
│
├── routes/            # API route definitions
│   ├── auth.routes.ts
│   ├── tweet.routes.ts
│   └── user.routes.ts
│
├── middleware/        # Express middleware
│   ├── auth.middleware.ts
│   └── error.middleware.ts
│
├── lib/              # Shared utilities
│   └── prisma.ts     # Prisma client instance
│
├── utils/            # Helper functions
│   ├── jwt.ts
│   └── hash.ts
│
└── app.ts           # Application entry point
```

### Architecture Principles

- **Controllers**: Handle HTTP concerns (request/response)
- **Services**: Contain all business logic and validation
- **Middleware**: Cross-cutting concerns (auth, logging, errors)
- **Routes**: Define API endpoints and bind controllers
- **Utils**: Reusable helper functions

---

## 🧪 Testing

### Running Test Scripts

We provide standalone test scripts to verify core functionality:

```bash
# Test authentication flow
npx ts-node src/services/auth/test-login.ts

# Test pagination logic
npx ts-node src/services/tweet/test-pagination.ts

# Test follow/unfollow system
npx ts-node src/services/user/test-follow.ts
```

### Test Coverage

- ✅ User registration and login
- ✅ JWT token generation and validation
- ✅ Cursor-based pagination
- ✅ Follow/Unfollow relationships
- ✅ Timeline feed generation

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Authenticate user |

### Tweets

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tweets` | Create tweet |
| GET | `/api/tweets/timeline` | Get personalized feed |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/:id/follow` | Follow user |
| DELETE | `/api/users/:id/follow` | Unfollow user |
| GET | `/api/users/:id` | Get user profile |

---

## 🔮 Roadmap

### ✅ Completed
- [x] Database schema design with Prisma
- [x] Core business logic implementation
- [x] JWT authentication system
- [x] Cursor-based pagination
- [x] Docker containerization
- [x] Follow/Unfollow system

### 🚧 In Progress
- [ ] REST API controllers and routing
- [ ] Comprehensive error handling middleware
- [ ] Request validation with Zod

### 📅 Upcoming
- [ ] Unit and integration tests
- [ ] CI/CD pipeline setup
- [ ] Rate limiting and security hardening
- [ ] API documentation with Swagger
- [ ] Cloud deployment (AWS/GCP/Azure)
- [ ] Redis caching layer
- [ ] WebSocket support for real-time updates

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and TypeScript

</div>
