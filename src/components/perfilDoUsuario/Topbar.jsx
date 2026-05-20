import { Link, useNavigate } from 'react-router-dom'
import "../../style/navbar.css"
import logoIcon from '../../assets/favicon.png'
import logoExit from '../../assets/exit.png'

export default function Topbar() {
    const navigate = useNavigate()

    return (
        <div className="topbar">
            <div className="logo">
                <img src={logoIcon} alt="Logo" className="logo-icon" />
                <span className="logo-name">Ciclo de Risco</span>
            </div>

            <div className="nav-right">
                <Link className="topbar-exit-link" to="/#">
                    <span>Sair</span>
                    <img className="exit-icon" src={logoExit} alt="Sair" className="exit-icon" />
                </Link>
            </div>
        </div>
    )
}