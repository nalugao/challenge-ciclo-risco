import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
    const { pathname } = useLocation()

    return (
        <div className="sidebar">
            <div className="sidebar-section">
                <div className="sidebar-label">Monitoramento</div>

                <Link to="/perfil" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
                    <svg viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity=".7" />
                        <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                        <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                        <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                    </svg>
                    Visão geral
                </Link>
                <Link to="/historico" className={`nav-item ${pathname === '/historico' ? 'active' : ''}`}>
                    <svg viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M7 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Histórico de Exames
                </Link>
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-section">
                <div className="sidebar-label">Pessoal</div>


                <Link to="/conta" className={`nav-item ${pathname === '/conta' ? 'active' : ''}`}>
                    <svg viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Dados da conta
                </Link>
            </div>
        </div>
    )
}