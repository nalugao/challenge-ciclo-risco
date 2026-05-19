import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  Legend,
} from 'recharts'

const paciente = {
  sexo: 'masculino',
  idade: 24,
}

const examesRenais = [
  {
    data: 'Jan',
    cistatinaC: 0.82,
    creatinina: 0.96,
    ureia: 32,
    microalbuminuriaCreatinina: 18,
    proteinuriaCreatinina: 0.12,
  },
  {
    data: 'Fev',
    cistatinaC: 1.05,
    creatinina: 1.14,
    ureia: 41,
    microalbuminuriaCreatinina: 28,
    proteinuriaCreatinina: 0.18,
  },
  {
    data: 'Mar',
    cistatinaC: 1.28,
    creatinina: 1.36,
    ureia: 57,
    microalbuminuriaCreatinina: 74,
    proteinuriaCreatinina: 0.26,
  },
  {
    data: 'Abr',
    cistatinaC: 1.48,
    creatinina: 1.58,
    ureia: 68,
    microalbuminuriaCreatinina: 325,
    proteinuriaCreatinina: 0.38,
  },
]

function getLimitesRenais(sexo, idade) {
  const masculino = sexo === 'masculino'
  const maior50 = idade > 50

  return {
    cistatinaMin: maior50
      ? masculino ? 0.72 : 0.64
      : masculino ? 0.60 : 0.57,

    cistatinaMax: maior50
      ? masculino ? 1.53 : 1.38
      : masculino ? 1.22 : 1.07,

    creatininaMin: masculino ? 0.72 : 0.57,
    creatininaMax: masculino ? 1.25 : 1.11,

    ureiaMin: idade >= 14 && idade <= 19 ? 18 : 10,
    ureiaMax: idade >= 14 && idade <= 19 ? 45 : 50,

    microalbuminuriaNormalMax: 30,
    microalbuminuriaMacroMin: 300,

    proteinuriaCreatininaMax: 0.20,
  }
}

function calcularRiscoRenal(exame, sexo, idade) {
  const limites = getLimitesRenais(sexo, idade)

  let pontos = 0

  if (exame.cistatinaC > limites.cistatinaMax) pontos += 2
  if (exame.creatinina > limites.creatininaMax) pontos += 2
  if (exame.ureia > limites.ureiaMax) pontos += 1

  if (exame.microalbuminuriaCreatinina >= 30) pontos += 2
  if (exame.microalbuminuriaCreatinina >= 300) pontos += 3

  if (exame.proteinuriaCreatinina > limites.proteinuriaCreatininaMax) pontos += 2

  let status = 'Normal'
  let classe = 'normal'
  let insight = 'Marcadores renais dentro da faixa esperada.'

  if (exame.microalbuminuriaCreatinina >= 30 && exame.microalbuminuriaCreatinina < 300) {
    status = 'Estresse renal'
    classe = 'alerta'
    insight =
      'Microalbuminúria elevada pode indicar estresse nos rins e perda inicial de proteína.'
  }

  if (
    exame.cistatinaC > limites.cistatinaMax ||
    exame.creatinina > limites.creatininaMax ||
    exame.proteinuriaCreatinina > limites.proteinuriaCreatininaMax
  ) {
    status = 'Atenção renal'
    classe = 'alerta'
    insight =
      'Creatinina, cistatina C ou proteinúria alteradas sugerem possível sobrecarga renal.'
  }

  if (exame.microalbuminuriaCreatinina >= 300 || pontos >= 5) {
    status = 'Risco renal alto'
    classe = 'critico'
    insight =
      'Há sinais importantes de perda de proteína ou alteração renal. É recomendado procurar avaliação médica.'
  }

  return {
    pontos,
    status,
    classe,
    insight,
  }
}

function TooltipRenal({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="tooltip-hepatico tooltip-simples">
      <span className="tooltip-data">{label}</span>

      {payload.map((item) => (
        <p key={item.dataKey} style={{ color: item.color }}>
          <strong>{item.name}:</strong> {item.value}
        </p>
      ))}
    </div>
  )
}

export default function RiscoRenalChart() {
  const ultimoExame = examesRenais[examesRenais.length - 1]
  const riscoAtual = calcularRiscoRenal(
    ultimoExame,
    paciente.sexo,
    paciente.idade
  )

  const limites = getLimitesRenais(paciente.sexo, paciente.idade)

  return (
    <div className="chart-hepatico">
      <div className="chart-header">
        <div>
          <h3>Risco Renal</h3>
          <p>Cistatina C, creatinina, ureia, microalbuminúria e proteinúria</p>
        </div>

        <span className={`badge-risco ${riscoAtual.classe}`}>
          {riscoAtual.status}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={examesRenais}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="data" />

          <YAxis domain={[0, 350]} />

          <Tooltip content={<TooltipRenal />} />

          <Legend />

          <ReferenceArea
            y1={0}
            y2={30}
            fill="#22c55e"
            fillOpacity={0.08}
          />

          <ReferenceArea
            y1={30}
            y2={299}
            fill="#facc15"
            fillOpacity={0.08}
          />

          <ReferenceArea
            y1={300}
            y2={350}
            fill="#ef4444"
            fillOpacity={0.08}
          />

          <Line
            type="monotone"
            dataKey="microalbuminuriaCreatinina"
            stroke="#ef4444"
            strokeWidth={3}
            name="Microalbuminúria/Creatinina mg/g"
            dot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="ureia"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Ureia mg/dL"
            dot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="creatinina"
            stroke="#a855f7"
            strokeWidth={3}
            name="Creatinina mg/dL"
            dot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="cistatinaC"
            stroke="#22c55e"
            strokeWidth={3}
            name="Cistatina C mg/L"
            dot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="proteinuriaCreatinina"
            stroke="#facc15"
            strokeWidth={3}
            name="Proteinúria/Creatinina g/g"
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={`chart-insight ${riscoAtual.classe}`}>
        <strong>Insight atual:</strong> {riscoAtual.insight}
      </div>

      <div className="limites-hepaticos">
        <span>Cistatina C: {limites.cistatinaMin}–{limites.cistatinaMax} mg/L</span>
        <span>Creatinina: {limites.creatininaMin}–{limites.creatininaMax} mg/dL</span>
        <span>Ureia: {limites.ureiaMin}–{limites.ureiaMax} mg/dL</span>
        <span>Microalbuminúria normal: &lt; 30 mg/g</span>
        <span>Macroalbuminúria: ≥ 300 mg/g</span>
      </div>
    </div>
  )
}