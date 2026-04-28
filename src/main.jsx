import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '.././index.css'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Home />
    <Footer />
  </StrictMode>,
)
