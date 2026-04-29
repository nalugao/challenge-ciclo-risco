import { useState } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { MOCK_DATA } from '../../data/mockData'
import '../../style/cardChart.css'

const { chartData } = MOCK_DATA
const { meses } = chartData

const buildColesterol = () =>
    meses.map((mes, i) => ({
        mes,
        LDL: chartData.colesterol.ldl[i],
        HDL: chartData.colesterol.hdl[i],
    }))

const buildTestosterona = () =>
    meses.map((mes, i) => ({
        mes,
        Testosterona: chartData.testosterona.total[i],
    }))

const buildHepatico = () =>
    meses.map((mes, i) => ({
        mes,
        TGO: chartData.hepatico.tgo[i],
        TGP: chartData.hepatico.tgp[i],
    }))

const TABS = [
    {
        id: 'colesterol',
        label: 'Colesterol',
        badge: 'LDL crítico',
        badgeClass: 'badge-red',
        data: buildColesterol(),
        limite: chartData.colesterol.limite,
        lines: [
            { key: 'LDL', cor: '#c0392b' },
            { key: 'HDL', cor: '#27ae60' },
        ],
    },
    {
        id: 'testosterona',
        label: 'Testosterona',
        badge: '4.100 ng/dL',
        badgeClass: 'badge-red',
        data: buildTestosterona(),
        limite: chartData.testosterona.limite,
        lines: [
            { key: 'Testosterona', cor: '#c084fc' },
        ],
    },
    {
        id: 'hepatico',
        label: 'Enzimas',
        badge: '2,5× limite',
        badgeClass: 'badge-yellow',
        data: buildHepatico(),
        limite: chartData.hepatico.limite,
        lines: [
            { key: 'TGO', cor: '#fb923c' },
            { key: 'TGP', cor: '#d97706' },
        ],
    },
]

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="chart-tooltip">
            <p className="chart-tooltip-label">{label}</p>
            {payload.map((p, i) => (
                <p key={i} style={{ color: p.color }}>
                    {p.name}: <strong>{p.value}</strong>
                </p>
            ))}
        </div>
    )
}

export default function CardChart() {
    const [abaAtiva, setAbaAtiva] = useState('colesterol')
    const tab = TABS.find(t => t.id === abaAtiva)

    return (
        <div className="card chart-card">
            <div className="chart-card-header">
                <div className="tab-bar">
                    {TABS.map(t => (
                        <button
                            key={t.id}
                            className={`tab ${abaAtiva === t.id ? 'active' : ''}`}
                            onClick={() => setAbaAtiva(t.id)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <span className={`badge ${tab.badgeClass}`}>{tab.badge}</span>
            </div>

            <div className="chart-wrap">
                <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={tab.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#141414" />
                        <XAxis
                            dataKey="mes"
                            tick={{ fontSize: 10, fill: '#2e2e2e' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 10, fill: '#2e2e2e' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine
                            y={tab.limite}
                            stroke="#2a2a2a"
                            strokeDasharray="4 4"
                            strokeWidth={1}
                        />
                        {tab.lines.map(l => (
                            <Line
                                key={l.key}
                                type="monotone"
                                dataKey={l.key}
                                stroke={l.cor}
                                strokeWidth={1.5}
                                dot={{ r: 3, fill: l.cor }}
                                activeDot={{ r: 5 }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-legend">
                {tab.lines.map(l => (
                    <div key={l.key} className="legend-item">
                        <span className="legend-line" style={{ background: l.cor }} />
                        <span className="legend-label">{l.key}</span>
                    </div>
                ))}
                <div className="legend-item">
                    <span className="legend-line legend-dashed" />
                    <span className="legend-label">limite</span>
                </div>
            </div>
        </div>
    )
}