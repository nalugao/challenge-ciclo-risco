import { Link } from 'react-router-dom'
import logoIcon from '../../assets/favicon.png'
import logoExit from '../../assets/sair.png'

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="logo">
                <img src={logoIcon} alt="Logo" className="logo-icon" />
                <span className="logo-name">Ciclo de Risco</span>
            </div>

            <div className="nav-right">
                <div className="topbar-avatar-wrap">
                    <img src={logoExit} alt="Logo" className="logo-icon" />
                    <span className="nav-link">Sair</span>
                </div>
            </div>
        </div>
    )
}