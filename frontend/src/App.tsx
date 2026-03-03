import LoginPage from './pages/LoginPage.tsx'
import { Footer } from './components/Footer.tsx'
import {Header} from './components/Header.tsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
    <Header />
    <LoginPage />
    <Footer />
    
    </>
  )
}

export default App
