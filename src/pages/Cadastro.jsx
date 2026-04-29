import { Link, useNavigate } from 'react-router-dom'
import '../style/login.css'

export default function Cadastro() {
    const navigate = useNavigate()

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
                    <p className="login_card_title">Criar conta</p>
                    <p className="login_card_sub">Preencha seus dados para começar.</p>

                    <div className="field">
                        <label>Nome completo</label>
                        <input type="text" placeholder="Seu nome" />
                    </div>
                    <div className="field">
                        <label>E-mail</label>
                        <input type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="field">
                        <label>Senha</label>
                        <input type="password" placeholder="••••••••" />
                    </div>
                    <div className="field">
                        <label>Confirmar senha</label>
                        <input type="password" placeholder="••••••••" />
                    </div>

                    <button className="btn_entrar" onClick={() => navigate('/onboarding')}>
                        Criar conta
                    </button>

                    <div className="divider"><span>ou</span></div>

                    <Link to="/login" className="btn_voltar">← Já tenho conta</Link>

                    <p className="login_card_footer">
                        Ao cadastrar, você concorda com os <a href="#">Termos de Uso</a>.
                    </p>
                </div>
            </div>

        </div>
    )
}