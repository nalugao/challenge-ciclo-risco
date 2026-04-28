import '../style/login.css'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className="login_wrap">

            <div className="login_left">
                <div className="login_logo">
                    <span className="login_logo_dot" />
                    <span className="login_logo_text">Ciclo de Risco</span>
                </div>
                <div className="login_left_middle">
                    <h1 className="login_left_headline">
                        Monitore o impacto<br /><em>no seu corpo.</em>
                    </h1>
                    <p className="login_left_sub">
                        Acompanhe exames, identifique riscos reais e entenda como os anabolizantes afetam sua saúde.
                    </p>
                </div>
                <div className="login_left_stats">
                    <div className="stat_item">
                        <p>3,3%</p>
                        <p>usam esteroides</p>
                    </div>
                    <div className="stat_item">
                        <p>2–3x</p>
                        <p>risco cardiovascular</p>
                    </div>
                    <div className="stat_item">
                        <p>78%</p>
                        <p>mortes entre 20–39 anos</p>
                    </div>
                </div>
            </div>

            <div className="login_right">
                <div className="login_card">
                    <p className="login_card_title">Entrar</p>
                    <p className="login_card_sub">Acesse sua conta para visualizar seus dados.</p>

                    <div className="field">
                        <label>E-mail</label>
                        <input type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="field">
                        <label>Senha</label>
                        <input type="password" placeholder="••••••••" />
                    </div>

                    <a href="#" className="forgot">Esqueci minha senha</a>

                    <button className="btn_entrar">Entrar</button>

                    <div className="divider"><span>ou</span></div>

                    <Link to="/" className="btn_voltar">← Voltar para o site</Link>

                    <p className="login_card_footer">
                        Não tem conta? <Link to="/cadastro" className="...">Cadastre-se</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}