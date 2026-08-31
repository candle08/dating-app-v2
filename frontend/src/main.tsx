import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { SwipingPage } from './pages/Swiping'
import { Profile } from './pages/Profile.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import './index.css';
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />

              <Route element={<ProtectedRoute />} >
                <Route path="/profile" element={<Profile />} />
                <Route path="/swiping" element={<SwipingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
          <App />
        </div>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
