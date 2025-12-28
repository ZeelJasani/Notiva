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
