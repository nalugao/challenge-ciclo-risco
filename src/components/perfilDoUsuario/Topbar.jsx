import { Link } from 'react-router-dom'
import "../../style/navbar.css"
import logoIcon from '../../assets/favicon.png'
import logoExit from '../../assets/exit.png'

export default function Topbar() {

    return (
        <div className="topbar">
            <div className="logo">
                <img src={logoIcon} alt="Logo" className="logo-icon" />
                <span className="logo-name">Ciclo de Risco</span>
            </div>

            <div className="nav-right">
                <Link to="/perfil" className="nav-item">
                    Visão geral
                </Link>

                <Link to="/historico" className="nav-item">
                    Histórico de Exames
                </Link>

                <Link to="/conta" className="nav-item">
                    Dados da conta
                </Link>

                <Link className="topbar-exit-link" to="/#">
                    <span>Sair</span>
                    <img className="exit-icon" src={logoExit} alt="Sair" className="exit-icon" />
                </Link>
            </div>
        </div>
    )
}