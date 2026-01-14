# 🐦 Blurt API — Social Media Backend

**Live Demo URL:** *(add later if deployed)*

---

## 🚀 Overview

**Blurt API** is a production-grade, scalable backend for a Twitter-like social media platform. It is built with **Node.js, TypeScript, Express, Prisma, and PostgreSQL**, following clean architecture and service-layer patterns.

The system focuses on **correct resource modeling**, **secure authentication**, and **social graph features** such as following users and building personalized timelines. It is fully containerized with Docker and designed for real-world backend interviews and production use.

---

## 🎥 Video Demo

**2-minute Demo Video (Architecture + API Walkthrough)**
*(To be added — Day 26)*

---

## ⚡ Key Features

* **Authentication**

  * Secure user registration & login
  * JWT-based authentication
  * Password hashing with Argon2
* **User Management**

  * Follow / Unfollow users
  * Fetch authenticated user (`/user/me`)
  * Avatar upload with Multer
* **Tweet System**

  * Create tweets
  * Edit tweets (author-only)
  * Delete tweets (author-only)
  * Fetch a single tweet
  * Personalized timeline feed
* **Authorization**

  * Ownership checks for tweet updates & deletion
  * Protected routes using middleware
* **Documentation**

  * Swagger / OpenAPI docs using JSDoc annotations
* **Infrastructure**

  * Docker & Docker Compose
  * PostgreSQL with Prisma ORM
* **CI/CD (Planned)**

  * Jenkins-based pipeline (GitHub Actions blocked due to billing)

---

## 🛠️ Technology Stack

| Component  | Technology              | Role                    |
| ---------- | ----------------------- | ----------------------- |
| Language   | TypeScript              | Type-safe backend logic |
| Runtime    | Node.js 20              | Server runtime          |
| Framework  | Express                 | HTTP server             |
| Database   | PostgreSQL 15           | Relational database     |
| ORM        | Prisma                  | Type-safe DB access     |
| Auth       | JWT + Argon2            | Secure authentication   |
| Uploads    | Multer                  | Avatar uploads          |
| Docs       | Swagger (OpenAPI)       | API documentation       |
| Containers | Docker & Docker Compose | Deployment              |

---

## 🌍 Deployment Notes

* Fully Dockerized for local or cloud deployment
* Designed to run on **EC2 / VPS**
* Supports persistent volumes for:

  * PostgreSQL data
  * Uploaded avatars

---

## 🔧 Local Setup Guide

### Prerequisites

* Docker & Docker Compose
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/KingsCreatives/blurt.git
cd blurt
```

---

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
PORT=4000

DATABASE_URL=postgresql://postgres:postgres@postgres:5432/blurt_db?schema=public

JWT_SECRET=super-secret-key

NODE_ENV=development
```

---

### 3. Start the Application

```bash
docker compose up --build
```

The API will be available at:

```
http://localhost:4000
```

---

### 4. Run Prisma Migrations

Inside the API container:

```bash
docker compose exec api npx prisma migrate deploy
```

---

## 📘 API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:4000/docs
```

Includes documentation for:

* Auth (register, login)
* Users (me, follow, unfollow, avatar)
* Tweets (create, edit, delete, fetch one, timeline)

---

## 🧪 Core API Workflows

### Authentication

1. **Register**

   ```
   POST /user
   ```

2. **Login**

   ```
   POST /auth/login
   ```

3. **Get Current User**

   ```
   GET /user/me
   ```

---

### Tweets

| Action        | Endpoint             |
| ------------- | -------------------- |
| Create tweet  | `POST /tweets`       |
| Edit tweet    | `PUT /tweets/:id`    |
| Delete tweet  | `DELETE /tweets/:id` |
| Get one tweet | `GET /tweets/:id`    |
| Timeline      | `GET /tweets`        |

---

## 📂 Project Structure

```
src/
├── controllers/        # Request handlers
├── services/           # Business logic
├── routes/             # Express routes
├── middleware/         # Auth, validation
├── schemas/            # Zod schemas
├── lib/                # Prisma, Multer
├── utils/              # Helpers
├── app.ts              # App bootstrap
└── server.ts           # Server entry
```

---

## 🧠 Design Decisions

* **Auth vs User separation**

  * Auth handles credentials & tokens
  * User handles profile & social graph
* **Service Layer Pattern**

  * Controllers are thin
  * Business rules live in services
* **Ownership Enforcement**

  * Tweets can only be edited/deleted by their author
* **Minimal API responses**

  * No sensitive data leaked
  * IDs returned for client-side state

---

## 🚧 CI/CD Status

* GitHub Actions blocked due to billing restrictions
* **Jenkins pipeline planned** (Day 27+)
* Docker-first workflow already validated

---

## 🎯 Final Notes

This project was built as a **real-world backend system**, not a tutorial app.
It demonstrates:

* Clean architecture
* Correct REST resource modeling
* Secure authentication
* Production Docker workflows
* Clear API documentation

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit with conventional commits
4. Open a Pull Request

---
