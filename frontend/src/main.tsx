import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { SwipingPage } from './pages/Swiping'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import './index.css';
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/swiping" element={<SwipingPage />} />
          </Route>
        </Routes>
        <App />

      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
