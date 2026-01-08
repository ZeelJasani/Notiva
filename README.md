<<<<<<< HEAD
<div align="center">
  <h1>Notiva</h1>
  <p>✨ Modern, collaborative note-taking with real-time editing and beautiful markdown support</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Drizzle ORM](https://img.shields.io/badge/Drizzle-0F172A?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
  [![Neon](https://img.shields.io/badge/Neon-12FFF7?style=for-the-badge&logo=neon&logoColor=white)](https://neon.tech/)
</div>

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Architecture](#-project-architecture)
- [Core Features](#-core-features)
- [API Documentation](#-api-documentation)
- [Performance & Security](#-performance--security)

## 🚀 Project Overview

Notiva is a modern, privacy-focused note-taking application that combines the simplicity of markdown with powerful collaboration features. Built with performance and user experience in mind, Notiva provides a seamless writing environment that works both online and offline.

The application stands out with its real-time collaboration capabilities, beautiful typography, and intuitive interface. Whether you're a student taking lecture notes, a developer documenting code, or a professional organizing thoughts, Notiva adapts to your workflow.

## 🛠 Technology Stack

<details>
<summary>Frontend</summary>

```yaml
framework: Next.js 13+ (App Router)
language: TypeScript
styling: Tailwind CSS
state_management: React Hooks
rich_text_editor: Tiptap
form_handling: React Hook Form + Zod
ui_components: Radix UI + Shadcn/UI
theming: next-themes
```
</details>

<details>
<summary>Backend</summary>

```yaml
runtime: Node.js
api_route_handlers: Next.js API Routes
database: PostgreSQL (Neon)
orm: Drizzle ORM
authentication: Custom JWT-based auth
email: Resend
```
</details>

<details>
<summary>DevOps</summary>

```yaml
version_control: Git
package_manager: npm
linting: ESLint
styling: Prettier
deployment: Vercel
ci_cd: GitHub Actions
```
</details>

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or Neon)
- npm 9+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notiva.git
   cd notiva
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your configuration.

4. Run database migrations:
   ```bash
   npx drizzle-kit push:pg
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Architecture

```
notiva/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Authenticated user dashboard
│   ├── (auth)/            # Authentication pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── editor/           # Rich text editor components
│   ├── forms/            # Form components
│   └── ui/               # Shadcn/UI components
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## ✨ Core Features

### Rich Text Editing
Notiva's editor is built with Tiptap, providing a seamless writing experience with markdown support, code highlighting, and real-time collaboration. The editor supports all standard formatting options while maintaining clean, semantic HTML output.

### Real-time Collaboration
Multiple users can edit documents simultaneously with changes reflected in real-time. The application uses WebSockets for efficient data synchronization and conflict resolution.

### Secure Authentication
Custom JWT-based authentication with email verification, password reset flows, and social login options. Passwords are securely hashed before storage.

### Dark Mode
Full support for light and dark themes with automatic system preference detection. The theming system is built on CSS variables for easy customization.

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Invalidate session
- `POST /api/auth/forgot-password` - Initiate password reset
- `POST /api/auth/reset-password` - Complete password reset

### Notes
- `GET /api/notes` - List all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a single note
- `PATCH /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## ⚡ Performance & Security

### Performance Optimizations
- ✅ Code splitting and lazy loading
- ✅ Image optimization with Next.js Image
- ✅ Server-side rendering for SEO
- ✅ Efficient state management
- ✅ Optimized database queries

### Security Measures
- 🔒 JWT-based authentication
- 🔒 CSRF protection
- 🔒 Rate limiting on auth endpoints
- 🔒 Secure password hashing with bcrypt
- 🔒 Input validation with Zod

### Accessibility
- ♿ Semantic HTML5
- ♿ Keyboard navigation
- ♿ ARIA labels and roles
- ♿ Color contrast compliance
- ♿ Screen reader support
=======
# <img src="./public/logo.svg" height="40" alt="Notiva Logo" /> Notiva

### The note-taking app that thinks like you code

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Tiptap](https://img.shields.io/badge/Tiptap-Block_Editor-24b47e?style=for-the-badge)](https://tiptap.dev/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)

**Notiva** is a minimal, high-performance note-taking platform designed specifically for developers. It bridges the gap between traditional text editors and powerful IDEs, offering a block-based workflow that mirrors how programmers structure their thoughts.

---

## ✨ Key Features

- **⌨️ Keyboard-first Navigation**: Navigate, create, and organize without ever touching your mouse.
- **🚀 Slash Commands**: Instant access to formatting, block types, and tools using `/`.
- **📟 Advanced Code Blocks**: Built-in syntax highlighting for common languages via Lowlight.
- **📂 Nested Hierarchy**: Organize your knowledge with infinite sub-pages and a clean sidebar navigation.
- **🌓 Adaptive Theme**: Seamless transitions between sleek Dark Mode and a crisp Light Mode.
- **⚡ Real-time Persistence**: Automatic, optimistic updates powered by Drizzle ORM and Neon.

---

## 🛠️ Tech Stack

Notiva is built using a modern, fast, and scalable stack:

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Editor**: [Tiptap](https://tiptap.dev/) (Headless block-based editor)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Neon](https://neon.tech/) (Serverless Postgres)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Auth**: [Better Auth](https://better-auth.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Neon PostgreSQL database instance

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ZeelJasani/Notiva.git
   cd Notiva
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=your_neon_db_url
   BETTER_AUTH_SECRET=your_auth_secret
   # Add other required environment variables
   ```

4. **Run Migrations:**

   ```bash
   npx drizzle-kit push
   ```

5. **Fire it up:**

   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture

Notiva utilizes Next.js Server Actions for a unified data layer, ensuring type safety from the database to the UI. The editor is modular, allowing for easy expansion of Tiptap extensions and custom node types.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/ZeelJasani">Zeel Dev</a>
</p>
>>>>>>> main
