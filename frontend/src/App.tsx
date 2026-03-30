import {LoginPage} from './pages/LoginPage.tsx'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { AuthProvider } from './components/AuthContext.tsx'
function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <LoginPage />
        <Footer />
      </AuthProvider>


    </>
  )
}

export default App
