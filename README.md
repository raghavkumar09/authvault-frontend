# 💻 AuthVault Frontend

AuthVault Frontend is a modern, responsive user interface built with React and Tailwind CSS. It provides a seamless experience for user registration, authentication, and profile management, fully integrated with the AuthVault API.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)](https://github.com/pmndrs/zustand)

---

## ✨ Features

- **Modern UI/UX**: Professional design with Tailwind CSS and glassmorphism elements.
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens.
- **Auth Flow**: Complete implementation of Login, Signup, and Google OAuth.
- **State Management**: Lightweight and fast state management using Zustand.
- **Form Handling**: Robust validation with React Hook Form and Yup.
- **Real-time Feedback**: Toast notifications for API success/error states.
- **User Dashboard**: Profile management and user card visualizations.
- **Route Protection**: Private and Public route handling for enhanced security.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router Dom v7
- **Icons**: Lucide React
- **API Client**: Axios
- **Form Validation**: React Hook Form, Yup

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- Running [AuthVault Backend](https://github.com/your-repo/authvault-backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd authvault-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Users, Layout, etc.)
├── hooks/          # Custom React hooks
├── pages/          # Page components (Landing, Login, Dashboard)
├── services/       # API interaction logic (Axios)
├── store/          # Zustand state stores
├── utils/          # Helper functions and constants
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```

---

## 🎨 UI Components

- **Landing Page**: Engaging hero section and feature highlights.
- **User Cards**: Dynamic display of user information and profile status.
- **Forms**: Clean, validated input forms for authentication.
- **Modals & Toasts**: Intuitive feedback mechanisms.

---

## 🔐 Admin Access

For testing the **Admin Panel**, use the following sample credentials:

- **Email**: `admin@authvault.com`
- **Password**: `Admin@123`

> [!NOTE]
> These credentials must be registered and promoted to `admin` in the backend database to work.

