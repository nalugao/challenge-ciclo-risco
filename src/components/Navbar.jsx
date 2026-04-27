import '../style/navbar.css'

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                    <p>Ciclo de Risco</p>
                    <ul className="menu_list">
                        <li>Painel</li>
                        <li>Mapa Corporal</li>
                        <li>Simulador</li>
                        <li>Insights</li>
                        <li>Login</li>
                    </ul>
            </nav>
        </>
    )
};