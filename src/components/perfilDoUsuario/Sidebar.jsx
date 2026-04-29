export default function Sidebar({ risco, alertasCount }) {
    const riscoConfig = {
        alto: { label: 'Alto', cor: '#c0392b' },
        atencao: { label: 'Atenção', cor: '#d4a017' },
        normal: { label: 'Normal', cor: '#27ae60' },
    }
    const rc = riscoConfig[risco]

    return (
        <div className="sidebar">
            <div className="sidebar-section">
                <div className="sidebar-label">Monitoramento</div>
                <div className="nav-item active">
                    <svg viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity=".7" />
                        <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                        <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                        <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                    </svg>
                    Visão geral
                </div>
                <div className="nav-item">
                    <svg viewBox="0 0 14 14" fill="none">
                        <path d="M1 10L4 6L7 8L10 4L13 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Análises
                </div>
                <div className="nav-item">
                    <svg viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M4 1v3M10 1v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Exames
                </div>
                <div className="nav-item">
                    <svg viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M7 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Histórico
                </div>
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-section">
                <div className="sidebar-label">Pessoal</div>
                <div className="nav-item">
                    <svg viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Perfil
                </div>
                <div className="nav-item">
                    <svg viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Configurações
                </div>
            </div>

            <div style={{ flex: 1 }} />

            <div className="risk-pill">
                <div className="risk-pill-label">Nível de risco</div>
                <div className="risk-pill-val" style={{ color: rc.cor }}>{rc.label}</div>
                <div className="risk-pill-sub">{alertasCount} alertas ativos</div>
            </div>
        </div>
    )
}