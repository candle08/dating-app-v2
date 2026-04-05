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

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Swiping" element={<SwipingPage />} />
            <Route path="/Profile" element={<Profile />} />
          </Route>
        </Routes>
        <App />

      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
