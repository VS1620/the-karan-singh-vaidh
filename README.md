# The Karan Singh  Vaidh - Ayurveda E-Commerce Platform

Complete e-commerce platform for Ayurvedic products with admin dashboard, shopping cart, and order management.

## 🚀 Quick Start

### Prerequisites
- Node.js (v20 or higher)
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Installation

**1. Clone and Install**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

**2. Environment Setup**
```bash
# In server directory, create .env file
cp .env.example .env
# Then edit .env with your actual credentials
```

**3. Run Locally**
```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

Visit `http://localhost:5173`

## 📦 Production Deployment

### Build Client
```bash
cd client
npm install
npm run build
```

### Start Server
```bash
cd server
npm install
npm start
```

## 🔐 Environment Variables

Required in `server/.env`:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key (32+ chars)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

See `.env.example` for full configuration.

## 🌐 Deployment Platforms

**Recommended: Render.com**
- Server: Web Service
- Client: Static Site
- [Full guide in deployment docs]

**Alternative: Railway.app, Vercel + Render**

## 📱 Features

- 🛒 Shopping cart & checkout
- 👤 User authentication
- 📦 Order management
- 🎨 Admin dashboard
- 📸 Image uploads via Cloudinary
- 📜 Policy pages (Privacy, Terms, Shipping, Refund)
- 🎨 Modern Ayurveda-themed design

## 🔧 Tech Stack

**Frontend:**
- React 19 + Vite
- TailwindCSS
- React Router
- Framer Motion
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (images)
- Helmet & CORS

## 📞 Contact

The Karan Singh  Vaidh  
Email: thekaransinghvaidh@gmail.com  
Phone: 82196 58454

---

© 2026 The Karan Singh  Vaidh. All rights reserved.
