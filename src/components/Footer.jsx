import '../style/footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer_top">
                <div className="footer_brand">
                    <div className="footer_logo">
                        <span className="footer_logo_dot" />
                        <span className="footer_logo_text">Ciclo de Risco</span>
                    </div>
                    <p className="footer_tagline">
                        Dados reais sobre o impacto dos esteroides anabolizantes no seu corpo.
                    </p>
                </div>

                <div className="footer_nav">
                    <p className="footer_nav_titulo">Navegação</p>
                    <ul>
                        <li><a href="#painel">Painel</a></li>
                        <li><a href="#mapa-corporal">Mapa Corporal</a></li>
                        <li><a href="#simulador">Simulador</a></li>
                        <li><a href="#insights">Insights</a></li>
                    </ul>
                </div>

                <div className="footer_nav">
                    <p className="footer_nav_titulo">Legal</p>
                    <ul>
                        <li><a href="#">Termos de Uso</a></li>
                        <li><a href="#">Privacidade</a></li>
                        <li><a href="#">Fontes</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer_bottom">
                <p>© {new Date().getFullYear()} Ciclo de Risco. Todos os direitos reservados.</p>
                <p className="footer_disclaimer">
                    Este site é informativo e não substitui orientação médica profissional.
                </p>
            </div>
        </footer>
    )
}