import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Navbar />
                    <Home />
                    <Footer />
                </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    )
}