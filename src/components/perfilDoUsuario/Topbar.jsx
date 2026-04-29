import { Link } from 'react-router-dom'

export default function Topbar({ perfil }) {
    return (
        <div className="topbar">
            <div className="logo">
                <div className="logo-mark">
                    <svg viewBox="0 0 12 12" fill="none">
                        <path d="M6 1L9 4H7V8H5V4H3L6 1Z" fill="white" />
                        <rect x="2" y="9" width="8" height="1.5" rx=".75" fill="white" opacity=".6" />
                    </svg>
                </div>
                <span className="logo-name">AnaboliTrack</span>
            </div>

            <div className="nav-right">
                <span className="nav-link active">Dashboard</span>
                <span className="nav-link">Histórico</span>
                <span className="nav-link">Simulador</span>
                <div className="topbar-avatar-wrap">
                    <div className="topbar-avatar">{perfil.avatar}</div>
                    <span className="topbar-avatar-name">{perfil.nome.split(' ')[0]} M.</span>
                </div>
            </div>
        </div>
    )
}