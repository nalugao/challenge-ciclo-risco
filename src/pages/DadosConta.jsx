import { useState } from 'react'
import '../style/dadosDaConta.css'
import Topbar from '../components/perfilDoUsuario/Topbar'
import Sidebar from '../components/perfilDoUsuario/Sidebar'

/* ─── Constants ─── */
const COMPOSTOS = [
    'Testosterona Enantato', 'Testosterona Cipionato', 'Trembolona',
    'Oxandrolona', 'Nandrolona', 'Boldenona', 'Stanozolol', 'Masteron',
]

const CONDICOES = [
    'Hipertensão', 'Colesterol elevado', 'Problemas hepáticos',
    'Histórico cardíaco familiar', 'Nenhuma das anteriores',
]

/* ─── Initial state (mirrors onboarding) ─── */
const INITIAL = {
    nome: 'Rafael', sobrenome: 'Mendonça', idade: '28', sexo: 'Masculino',
    peso: '92', altura: '181',
    cicloAtivo: 'sim',
    compostos: ['Testosterona Enantato', 'Stanozolol'],
    dosagem: '500', tempoUso: 'Mais de 12 meses',
    fezeExames: 'recentes',
    condicoes: ['Colesterol elevado'],
}

/* ─── Sub-components ─── */

function RadioGroup({ options, value, onChange }) {
    return (
        <div className="dc-radio-group">
            {options.map(o => {
                const sel = value === o.val
                return (
                    <div
                        key={o.val}
                        className={`dc-radio-opt${sel ? ' dc-radio-opt--sel' : ''}`}
                        onClick={() => onChange(o.val)}
                    >
                        <div className="dc-radio-dot">
                            {sel && <div className="dc-radio-inner" />}
                        </div>
                        <span className="dc-radio-text">{o.label}</span>
                    </div>
                )
            })}
        </div>
    )
}

function TagPicker({ options, value, onChange }) {
    const toggle = v =>
        onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v])
    return (
        <>
            <div className="dc-tags">
                {options.map(c => (
                    <div
                        key={c}
                        className={`dc-tag${value.includes(c) ? ' dc-tag--sel' : ''}`}
                        onClick={() => toggle(c)}
                    >
                        {c}
                    </div>
                ))}
            </div>
            <div className="dc-tag-count">
                {value.length === 0
                    ? 'Nenhum composto selecionado'
                    : `${value.length} composto${value.length > 1 ? 's' : ''} selecionado${value.length > 1 ? 's' : ''}`}
            </div>
        </>
    )
}

function CheckGroup({ options, value, onChange }) {
    const toggle = v =>
        onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v])
    return (
        <div className="dc-check-group">
            {options.map(c => {
                const sel = value.includes(c)
                return (
                    <div
                        key={c}
                        className={`dc-check-opt${sel ? ' dc-check-opt--sel' : ''}`}
                        onClick={() => toggle(c)}
                    >
                        <div className="dc-check-box">{sel && '✓'}</div>
                        <span className="dc-check-text">{c}</span>
                    </div>
                )
            })}
        </div>
    )
}

function Toast({ msg, show, warn }) {
    return (
        <div className={`dc-toast${show ? ' dc-toast--show' : ''}`}>
            <div className={`dc-toast-dot${warn ? ' dc-toast-dot--warn' : ''}`} />
            {msg}
        </div>
    )
}

/* ─── Main component ─── */

export default function DadosDaConta() {
    const [form, setForm] = useState(INITIAL)
    const [saved, setSaved] = useState(INITIAL)
    const [toast, setToast] = useState({ show: false, msg: '', warn: false })
    const [saving, setSaving] = useState(false)

    const dirty = JSON.stringify(form) !== JSON.stringify(saved)
    const update = (key, val) => setForm(p => ({ ...p, [key]: val }))
    const initials = `${form.nome[0] || ''}${form.sobrenome[0] || ''}`.toUpperCase()

    const showToast = (msg, warn = false) => {
        setToast({ show: true, msg, warn })
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3200)
    }

    const handleSave = async () => {
        setSaving(true)
        await new Promise(r => setTimeout(r, 900))
        setSaved({ ...form })
        setSaving(false)
        showToast('Dados atualizados com sucesso')
    }

    const handleDiscard = () => {
        setForm({ ...saved })
        showToast('Alterações descartadas', true)
    }

    const saveBtnClass = [
        'dc-btn-save',
        dirty ? 'dc-btn-save--active' : '',
        saving ? 'dc-btn-save--saving' : '',
    ].filter(Boolean).join(' ')

    return (
        <div className="dc-wrap">
            
            <Topbar />

            <Sidebar/>
            {/* Page */}
            <div className="dc-page">

                {/* Header */}
                <div className="dc-header">
                    <div className="dc-avatar">{initials}</div>
                    <div className="dc-header-info">
                        <h1>
                            {form.nome} {form.sobrenome}
                            {dirty && <span className="dc-dirty-badge">● Alterações não salvas</span>}
                        </h1>
                        <p>
                            {form.idade} anos · {form.peso} kg · {form.altura} cm
                            {form.cicloAtivo === 'sim' && ' · Ciclo ativo'}
                            {form.cicloAtivo === 'off' && ' · Em off'}
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="dc-grid">

                    {/* Perfil básico */}
                    <div className="dc-section dc-section--accent">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <circle cx="8" cy="5.5" r="3" />
                                <path d="M2 14.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                            </svg>
                            Perfil básico
                        </div>
                        <div className="dc-row2">
                            <div className="dc-field">
                                <label>Nome</label>
                                <input type="text" value={form.nome} placeholder="Seu nome"
                                    onChange={e => update('nome', e.target.value)} />
                            </div>
                            <div className="dc-field">
                                <label>Sobrenome</label>
                                <input type="text" value={form.sobrenome} placeholder="Sobrenome"
                                    onChange={e => update('sobrenome', e.target.value)} />
                            </div>
                            <div className="dc-field">
                                <label>Idade</label>
                                <input type="number" value={form.idade} placeholder="28"
                                    onChange={e => update('idade', e.target.value)} />
                            </div>
                            <div className="dc-field">
                                <label>Sexo biológico</label>
                                <select value={form.sexo} onChange={e => update('sexo', e.target.value)}>
                                    <option>Masculino</option>
                                    <option>Feminino</option>
                                </select>
                            </div>
                            <div className="dc-field">
                                <label>Peso (kg)</label>
                                <input type="number" value={form.peso} placeholder="85"
                                    onChange={e => update('peso', e.target.value)} />
                            </div>
                            <div className="dc-field">
                                <label>Altura (cm)</label>
                                <input type="number" value={form.altura} placeholder="178"
                                    onChange={e => update('altura', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Ciclo atual */}
                    <div className="dc-section">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 5v3.5l2 2" />
                            </svg>
                            Ciclo atual
                        </div>
                        <div className="dc-field">
                            <label>Status do ciclo</label>
                            <RadioGroup
                                value={form.cicloAtivo}
                                onChange={v => update('cicloAtivo', v)}
                                options={[
                                    { val: 'sim', label: 'Sim, estou em ciclo ativo' },
                                    { val: 'off', label: 'Não, estou em off' },
                                    { val: 'nunca', label: 'Nunca usei' },
                                ]}
                            />
                        </div>
                        {form.cicloAtivo !== 'nunca' && (
                            <div className="dc-row2">
                                <div className="dc-field">
                                    <label>Dosagem semanal (mg)</label>
                                    <input type="number" value={form.dosagem} placeholder="500"
                                        onChange={e => update('dosagem', e.target.value)} />
                                </div>
                                <div className="dc-field">
                                    <label>Tempo de uso</label>
                                    <select value={form.tempoUso} onChange={e => update('tempoUso', e.target.value)}>
                                        <option>Menos de 3 meses</option>
                                        <option>3–6 meses</option>
                                        <option>6–12 meses</option>
                                        <option>Mais de 12 meses</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Compostos — full width */}
                    <div className="dc-section dc-full">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <path d="M6 2v4L3 12h10L10 6V2" />
                                <path d="M6 2h4" />
                            </svg>
                            Compostos utilizados
                        </div>
                        <TagPicker
                            options={COMPOSTOS}
                            value={form.compostos}
                            onChange={v => update('compostos', v)}
                        />
                    </div>

                    {/* Exames */}
                    <div className="dc-section">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
                                <path d="M6 6h4M6 8.5h4M6 11h2" />
                            </svg>
                            Exames laboratoriais
                        </div>
                        <div className="dc-field">
                            <label>Já realizou exames?</label>
                            <RadioGroup
                                value={form.fezeExames}
                                onChange={v => update('fezeExames', v)}
                                options={[
                                    { val: 'recentes', label: 'Sim, recentes (menos de 6 meses)' },
                                    { val: 'antigos', label: 'Sim, mas antigos (mais de 6 meses)' },
                                    { val: 'nunca', label: 'Nunca fiz' },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Condições */}
                    <div className="dc-section">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 5v6M5 8h6" />
                            </svg>
                            Condições pré-existentes
                        </div>
                        <CheckGroup
                            options={CONDICOES}
                            value={form.condicoes}
                            onChange={v => update('condicoes', v)}
                        />
                    </div>

                    {/* Save bar — full width */}
                    <div className="dc-save-bar dc-full">
                        <div className="dc-save-info">
                            Última atualização: <span>12 abr 2025 às 14:32</span>
                        </div>
                        <div className="dc-save-actions">
                            {dirty && (
                                <button className="dc-btn-discard" onClick={handleDiscard}>
                                    Descartar
                                </button>
                            )}
                            <button
                                className={saveBtnClass}
                                onClick={handleSave}
                                disabled={!dirty || saving}
                            >
                                {saving ? 'Salvando…' : 'Salvar alterações'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <Toast msg={toast.msg} show={toast.show} warn={toast.warn} />
        </div>
    )
}