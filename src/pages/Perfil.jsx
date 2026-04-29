// import { useState } from 'react'
import Sidebar from '../components/perfilDoUsuario/Sidebar'
import Topbar from '../components/perfilDoUsuario/Topbar'
import CardMetrica from '../components/perfilDoUsuario/CardMetrica'
import CardChart from '../components/perfilDoUsuario/CardChart'
import CardAlertasExamesInsights from '../components/perfilDoUsuario/CardAlertasExamesInsights'
import CardExames from '../components/perfilDoUsuario/CardExames'
// import InsightsCard from '../components/InsightsCard'
import { MOCK_DATA } from '../data/mockData'
import '../style/perfil.css'

export default function Perfil() {
    const { perfil, metricas, alertas, exames } = MOCK_DATA

    return (
        <div className="shell">
            <Topbar perfil={perfil} />
            <div className="main">
                <Sidebar risco={perfil.nivelRisco} alertasCount={alertas.length} />
                <div className="content">
                    <div className="page-header">
                        <div>
                            <h1 className="page-title">Bom dia, {perfil.nome.split(' ')[0]}</h1>
                            <p className="page-sub">
                                {perfil.idade} anos · Ciclo ativo há {perfil.tempoUso} · {perfil.dosagem}
                            </p>
                        </div>
                        <div className="last-update">
                            Último exame<br />
                            <span>{perfil.ultimoExame}</span>
                        </div>
                    </div>

                    <div className="metrics-row">
                        {metricas.map(m => (
                            <CardMetrica key={m.id} {...m} />
                        ))}
                    </div>

                    <div className="grid-main">
                        <CardChart />
                        <CardAlertasExamesInsights alertas={alertas} />
                    </div>

                    <div className="bottom-grid">
                        <CardExames exames={exames} />
                        {/* <InsightsCard insights={insights} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}