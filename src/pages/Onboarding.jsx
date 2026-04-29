import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/onboarding.css'

const COMPOSTOS = [
    'Testosterona Enantato', 'Testosterona Cipionato', 'Trembolona',
    'Oxandrolona', 'Nandrolona', 'Boldenona', 'Stanozolol', 'Masteron',
]

const CONDICOES = [
    'Hipertensão', 'Colesterol elevado', 'Problemas hepáticos',
    'Histórico cardíaco familiar', 'Nenhuma das anteriores',
]

export default function Onboarding() {
    const navigate = useNavigate()
    const [etapa, setEtapa] = useState(1)
    const [form, setForm] = useState({
        nome: '', sobrenome: '', idade: '', sexo: '', peso: '', altura: '',
        cicloAtivo: 'sim', compostos: [], dosagem: '', tempoUso: '',
        fezeExames: 'sim', condicoes: [],
    })

    const update = (key, val) => setForm(p => ({ ...p, [key]: val }))

    const toggleArray = (key, val) => {
        setForm(p => ({
            ...p,
            [key]: p[key].includes(val)
                ? p[key].filter(v => v !== val)
                : [...p[key], val],
        }))
    }

    const progressos = { 1: '33%', 2: '66%', 3: '100%' }

    return (
        <div className="ob-wrap">
            <div className="ob-left">
                <div className="ob-logo">
                    <div className="ob-logo-mark">
                        <svg viewBox="0 0 12 12" fill="none">
                            <path d="M6 1L9 4H7V8H5V4H3L6 1Z" fill="white" />
                            <rect x="2" y="9" width="8" height="1.5" rx=".75" fill="white" opacity=".6" />
                        </svg>
                    </div>
                    <span className="ob-logo-name">Ciclo de Risco</span>
                </div>

                <div className="ob-steps">
                    {[
                        { n: 1, label: 'Perfil básico', desc: 'Dados pessoais e físicos' },
                        { n: 2, label: 'Uso atual', desc: 'Ciclo, compostos e dosagem' },
                        { n: 3, label: 'Histórico', desc: 'Condições e exames anteriores' },
                    ].map((s, i) => (
                        <div key={s.n}>
                            <div className={`ob-step ${etapa === s.n ? 'active' : ''}`}>
                                <div className={`ob-step-num ${etapa > s.n ? 'done' : etapa === s.n ? 'current' : 'pending'}`}>
                                    {etapa > s.n ? '✓' : s.n}
                                </div>
                                <div>
                                    <div className={`ob-step-label ${etapa === s.n ? 'active' : etapa > s.n ? 'done' : ''}`}>
                                        {s.label}
                                    </div>
                                    <div className="ob-step-desc">{s.desc}</div>
                                </div>
                            </div>
                            {i < 2 && <div className="ob-connector" />}
                        </div>
                    ))}
                </div>

                <div className="ob-footer">
                    Seus dados são usados apenas para<br />
                    monitoramento de saúde pessoal.<br />
                    Nunca compartilhamos com terceiros.
                </div>
            </div>

            <div className="ob-right">
                <div className="ob-form-wrap">
                    <div className="ob-progress">
                        <div className="ob-progress-bar" style={{ width: progressos[etapa] }} />
                    </div>

                    {/* ETAPA 1 */}
                    {etapa === 1 && (
                        <div>
                            <div className="ob-tag">Etapa 1 de 3</div>
                            <h1 className="ob-title">Conta pra gente sobre você</h1>
                            <p className="ob-sub">Essas informações ajudam a calibrar sua análise de risco com mais precisão.</p>

                            <div className="ob-row">
                                <div className="ob-field">
                                    <label>Nome</label>
                                    <input type="text" placeholder="Seu nome" value={form.nome} onChange={e => update('nome', e.target.value)} />
                                </div>
                                <div className="ob-field">
                                    <label>Sobrenome</label>
                                    <input type="text" placeholder="Sobrenome" value={form.sobrenome} onChange={e => update('sobrenome', e.target.value)} />
                                </div>
                            </div>
                            <div className="ob-row">
                                <div className="ob-field">
                                    <label>Idade</label>
                                    <input type="number" placeholder="28" value={form.idade} onChange={e => update('idade', e.target.value)} />
                                </div>
                                <div className="ob-field">
                                    <label>Sexo biológico</label>
                                    <select value={form.sexo} onChange={e => update('sexo', e.target.value)}>
                                        <option value="">Selecionar</option>
                                        <option>Masculino</option>
                                        <option>Feminino</option>
                                    </select>
                                </div>
                            </div>
                            <div className="ob-row">
                                <div className="ob-field">
                                    <label>Peso (kg)</label>
                                    <input type="number" placeholder="85" value={form.peso} onChange={e => update('peso', e.target.value)} />
                                </div>
                                <div className="ob-field">
                                    <label>Altura (cm)</label>
                                    <input type="number" placeholder="178" value={form.altura} onChange={e => update('altura', e.target.value)} />
                                </div>
                            </div>

                            <div className="ob-btn-row">
                                <span />
                                <button className="ob-btn-next" onClick={() => setEtapa(2)}>Continuar →</button>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 2 */}
                    {etapa === 2 && (
                        <div>
                            <div className="ob-tag">Etapa 2 de 3</div>
                            <h1 className="ob-title">Uso atual de esteroides</h1>
                            <p className="ob-sub">Informações sobre seu ciclo atual ou mais recente.</p>

                            <div className="ob-field">
                                <label>Está em ciclo atualmente?</label>
                                <div className="ob-radio-group">
                                    {[
                                        { val: 'sim', label: 'Sim, estou em ciclo ativo' },
                                        { val: 'off', label: 'Não, estou em off' },
                                        { val: 'nunca', label: 'Nunca usei' },
                                    ].map(o => (
                                        <div
                                            key={o.val}
                                            className={`ob-radio-opt ${form.cicloAtivo === o.val ? 'selected' : ''}`}
                                            onClick={() => update('cicloAtivo', o.val)}
                                        >
                                            <div className="ob-radio-dot">
                                                {form.cicloAtivo === o.val && <div className="ob-radio-inner" />}
                                            </div>
                                            <span className="ob-radio-text">{o.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ob-field">
                                <label>Compostos utilizados</label>
                                <div className="ob-tags">
                                    {COMPOSTOS.map(c => (
                                        <div
                                            key={c}
                                            className={`ob-tag-item ${form.compostos.includes(c) ? 'selected' : ''}`}
                                            onClick={() => toggleArray('compostos', c)}
                                        >
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ob-row">
                                <div className="ob-field">
                                    <label>Dosagem semanal (mg)</label>
                                    <input type="number" placeholder="500" value={form.dosagem} onChange={e => update('dosagem', e.target.value)} />
                                </div>
                                <div className="ob-field">
                                    <label>Tempo de uso</label>
                                    <select value={form.tempoUso} onChange={e => update('tempoUso', e.target.value)}>
                                        <option value="">Selecionar</option>
                                        <option>Menos de 3 meses</option>
                                        <option>3–6 meses</option>
                                        <option>6–12 meses</option>
                                        <option>Mais de 12 meses</option>
                                    </select>
                                </div>
                            </div>

                            <div className="ob-btn-row">
                                <button className="ob-btn-back" onClick={() => setEtapa(1)}>← Voltar</button>
                                <button className="ob-btn-next" onClick={() => setEtapa(3)}>Continuar →</button>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 3 */}
                    {etapa === 3 && (
                        <div>
                            <div className="ob-tag">Etapa 3 de 3</div>
                            <h1 className="ob-title">Histórico de saúde</h1>
                            <p className="ob-sub">Isso nos ajuda a identificar riscos pré-existentes e personalizar seus alertas.</p>

                            <div className="ob-field">
                                <label>Já fez exames laboratoriais?</label>
                                <div className="ob-radio-group">
                                    {[
                                        { val: 'recentes', label: 'Sim, tenho exames recentes (menos de 6 meses)' },
                                        { val: 'antigos', label: 'Sim, mas são antigos (mais de 6 meses)' },
                                        { val: 'nunca', label: 'Nunca fiz' },
                                    ].map(o => (
                                        <div
                                            key={o.val}
                                            className={`ob-radio-opt ${form.fezeExames === o.val ? 'selected' : ''}`}
                                            onClick={() => update('fezeExames', o.val)}
                                        >
                                            <div className="ob-radio-dot">
                                                {form.fezeExames === o.val && <div className="ob-radio-inner" />}
                                            </div>
                                            <span className="ob-radio-text">{o.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ob-field">
                                <label>Condições pré-existentes</label>
                                <div className="ob-check-group">
                                    {CONDICOES.map(c => (
                                        <div
                                            key={c}
                                            className={`ob-check-opt ${form.condicoes.includes(c) ? 'selected' : ''}`}
                                            onClick={() => toggleArray('condicoes', c)}
                                        >
                                            <div className="ob-check-box">
                                                {form.condicoes.includes(c) && <span>✓</span>}
                                            </div>
                                            <span className="ob-check-text">{c}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ob-btn-row">
                                <button className="ob-btn-back" onClick={() => setEtapa(2)}>← Voltar</button>
                                <button className="ob-btn-next" onClick={() => navigate('/perfil')}>
                                    Acessar dashboard →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}