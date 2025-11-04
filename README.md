# 🛍️ Pxllar E-Commerce Store

**Pxllar Store** is a modern, full-stack e-commerce platform built with **Next.js** and **Medusa.js**, offering a scalable, high-performance shopping experience.  
It combines a sleek and responsive storefront with a powerful headless backend — designed, developed, and owned by **Zaamir Shaikh**.

---

## 🚀 Tech Stack

| Layer                     | Technology                                 |
| ------------------------- | ------------------------------------------ |
| **Frontend (Storefront)** | Next.js 15, React, Tailwind CSS, shadcn/ui |
| **Backend (API)**         | Medusa.js (Node.js, Express)               |
| **Database**              | PostgreSQL (hosted on Supabase / Railway)  |
| **Caching**               | Redis                                      |
| **Hosting**               | Vercel (frontend), Railway (backend)       |
| **Payments**              | Razorpay + COD                             |
| **Auth & Sessions**       | Medusa built-in + Redis                    |
| **Deployment Ports**      | Admin: `9000` • Storefront: `3000`         |

---

## 🧠 Overview

Pxllar Store is built to bring premium and indie fashion brands together on one modern, responsive platform.  
It supports full product management, customer authentication, order tracking, and a customizable admin dashboard powered by Medusa.

**Key Features:**

- 🛒 Modern Next.js Storefront
- ⚙️ Medusa Headless Backend
- 💳 Razorpay + Cash-on-Delivery payments
- 📦 Order & Inventory Management
- 🧾 Customer Accounts & Wishlist
- 🌗 Dark Mode + Fully Responsive Design
- 🔐 Secure API routes with JWT
- 📊 Admin Dashboard on Port `9000`

---

## 📦 Project Structure

```
PxllarEcommerceStore/
├── medusa-backend/        # Medusa backend API
│   ├── src/
│   ├── medusa-config.ts
│   ├── .env
│   └── package.json
│
├── pxllar-storefront/     # Next.js frontend store
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── .env.local
│   └── package.json
│
└── README.md
```

---

## ⚙️ Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ShaikhZaamir/PxllarEcommerceStore.git
cd PxllarEcommerceStore
```

### 2️⃣ Backend Setup (Medusa)

```bash
cd medusa-backend
npm install
cp .env.example .env
```

#### 🧩 Environment Variables

```env
MEDUSA_ADMIN_ONBOARDING_TYPE=default
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000,http://localhost:3000
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
DATABASE_URL=postgres://postgres:postgres@localhost/medusa-my-medusa-store
DB_NAME=medusa-my-medusa-store
```

> ⚠️ Make sure PostgreSQL and Redis are running locally before starting the backend.

#### ▶️ Run the Backend

```bash
npm run start
```

✅ Backend runs at: **http://localhost:9000**  
✅ Admin Dashboard: **http://localhost:9000/app**

---

### 3️⃣ Frontend Setup (Next.js)

```bash
cd ../pxllar-storefront
npm install
cp .env.example .env.local
```

#### 🧩 Environment Variables

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_RAZORPAY_KEY=rzp_test_...
```

#### ▶️ Run the Storefront

```bash
npm run dev
```

✅ Storefront runs at: **http://localhost:3000**

---

## ☁️ Deployment

| Service  | Platform               | Notes                                                               |
| -------- | ---------------------- | ------------------------------------------------------------------- |
| Backend  | **Railway**            | Node.js service with PostgreSQL + Redis                             |
| Frontend | **Vercel**             | Connected via environment variable `NEXT_PUBLIC_MEDUSA_BACKEND_URL` |
| Database | **Supabase / Railway** | PostgreSQL instance                                                 |
| Cache    | **Redis Cloud**        | Session & cache handling                                            |

> 💡 Use the same `.env` variables on Railway and Vercel. Update URLs after deployment.

---

## 🧑‍💻 Common Commands

| Command                     | Description                             |
| --------------------------- | --------------------------------------- |
| `npm run start`             | Start Medusa backend                    |
| `npm run dev`               | Start Next.js storefront in development |
| `npx @medusajs/admin build` | Build Medusa Admin (if needed)          |
| `npm run build`             | Build Next.js storefront for production |

---

## 🗺️ Roadmap

- [ ] Add blog module
- [ ] Launch multi-language support
- [ ] Add product reviews & ratings
- [ ] PWA integration for mobile app-like experience
- [ ] Expand admin analytics dashboard

---

## 👑 Author

**Zaamir Shaikh**  
📍 Mumbai, India  
💻 [GitHub](https://github.com/ShaikhZaamir) • ✉️ shaikhzaamir04@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

### ⭐ Show your support

If you like this project, consider giving it a **star ⭐ on GitHub** — it helps more developers discover Pxllar!
