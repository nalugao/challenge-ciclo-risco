import { useState } from 'react'
import '../style/navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <nav className="navbar">
                <a className="logo" href="#">
                    <span className="logo-dot" />
                    <span className="logo-text">Ciclo de Risco</span>
                </a>
                <ul className="menu_list">
                    <li><a href="#painel">Painel</a></li>
                    <li><a href="#mapa-corporal">Mapa Corporal</a></li>
                    <li><a href="#simulador">Simulador</a></li>
                    <li><a href="#insights">Insights</a></li>
                    <li><Link className="btn-login" to="/login">Login</Link></li>
                </ul>
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span /><span /><span />
                </div>
            </nav>
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <a href="#painel">Painel</a>
                <a href="#mapa-corporal">Mapa Corporal</a>
                <a href="#simulador">Simulador</a>
                <a href="#insights">Insights</a>
                <a className="btn-login" href="/login">Login</a>
            </div>
        </>
    )
}