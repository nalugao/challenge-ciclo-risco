import { useState } from 'react'
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
  jejum12h: true,
}

const examesCardio = [
  {
    data: 'Jan',
    hdl: 48,
    ldl: 92,
    naoHdl: 118,
    vldl: 22,
    triglicerides: 110,
    pcrUs: 0.8,
    apoA1: 145,
    apoB: 88,
    homocisteina: 9.4,
    ntProBnp: 80,
    lpa: 22,
    pressaoSistolica: 118,
    pressaoDiastolica: 76,
  },
  {
    data: 'Fev',
    hdl: 38,
    ldl: 128,
    naoHdl: 158,
    vldl: 30,
    triglicerides: 148,
    pcrUs: 1.9,
    apoA1: 132,
    apoB: 112,
    homocisteina: 11.2,
    ntProBnp: 96,
    lpa: 25,
    pressaoSistolica: 124,
    pressaoDiastolica: 82,
  },
  {
    data: 'Mar',
    hdl: 31,
    ldl: 168,
    naoHdl: 196,
    vldl: 38,
    triglicerides: 190,
    pcrUs: 3.4,
    apoA1: 110,
    apoB: 138,
    homocisteina: 14.6,
    ntProBnp: 132,
    lpa: 28,
    pressaoSistolica: 136,
    pressaoDiastolica: 88,
  },
  {
    data: 'Abr',
    hdl: 25,
    ldl: 196,
    naoHdl: 235,
    vldl: 46,
    triglicerides: 230,
    pcrUs: 4.8,
    apoA1: 92,
    apoB: 162,
    homocisteina: 16.1,
    ntProBnp: 158,
    lpa: 33,
    pressaoSistolica: 145,
    pressaoDiastolica: 94,
  },
]

function getLimitesCardio(idade, sexo, jejum12h) {
  const adulto = idade >= 20
  const masculino = sexo === 'masculino'

  return {
    hdlMin: adulto ? 40 : 45,

    ldlMetaAltoRisco: 70,
    ldlMaxAdolescente: 110,
    ldlAltoMin: 160,
    ldlMuitoAltoMin: 190,

    naoHdlMetaAdultoAltoRisco: 100,
    naoHdlMetaAdolescente: 120,
    naoHdlAdultoOtimo: 130,
    naoHdlAdultoAlto: 160,
    naoHdlAdultoMuitoAlto: 190,

    vldlMax: adulto
      ? jejum12h ? 30 : 35
      : jejum12h ? 18 : 20,

    trigliceridesMax: adulto
      ? jejum12h ? 150 : 175
      : jejum12h ? 90 : 100,

    pcrBaixoMax: 1,
    pcrIntermediarioMax: 3,

    apoA1Min: masculino ? 95 : 101,
    apoA1Max: masculino ? 185 : 223,

    apoBMin: masculino ? 49 : 53,
    apoBMax: masculino ? 173 : 182,

    homocisteinaMin: 3.7,
    homocisteinaMax: 13.9,

    ntProBnpRisco: 125,

    lpaMax: 30,

    pressaoAlertaSistolica: 120,
    pressaoAlertaDiastolica: 80,
    pressaoAltaSistolica: 140,
    pressaoAltaDiastolica: 90,
  }
}

function calcularRiscoCardio(exame, idade, sexo, jejum12h) {
  const limites = getLimitesCardio(idade, sexo, jejum12h)

  let pontos = 0

  if (exame.hdl < limites.hdlMin) pontos += 2
  if (exame.ldl >= limites.ldlAltoMin) pontos += 2
  if (exame.ldl >= limites.ldlMuitoAltoMin) pontos += 3
  if (exame.naoHdl >= limites.naoHdlAdultoAlto) pontos += 2
  if (exame.triglicerides >= limites.trigliceridesMax) pontos += 1
  if (exame.vldl >= limites.vldlMax) pontos += 1
  if (exame.pcrUs > limites.pcrIntermediarioMax) pontos += 2
  if (exame.homocisteina > limites.homocisteinaMax) pontos += 1
  if (exame.ntProBnp > limites.ntProBnpRisco) pontos += 2
  if (exame.lpa > limites.lpaMax) pontos += 1
  if (
    exame.pressaoSistolica >= limites.pressaoAltaSistolica ||
    exame.pressaoDiastolica >= limites.pressaoAltaDiastolica
  ) {
    pontos += 2
  }

  let status = 'Normal'
  let classe = 'normal'
  let insight = 'Marcadores cardiovasculares dentro da faixa esperada.'

  if (exame.hdl < limites.hdlMin || exame.ldl >= limites.ldlAltoMin) {
    status = 'Atenção cardiovascular'
    classe = 'alerta'
    insight =
      'HDL baixo ou LDL elevado aumentam o risco cardiovascular, especialmente em usuários de esteroides.'
  }

  if (exame.pcrUs > limites.pcrIntermediarioMax) {
    status = 'Inflamação vascular'
    classe = 'alerta'
    insight =
      'PCR ultra-sensível elevada pode indicar maior risco inflamatório cardiovascular.'
  }

  if (
    exame.ldl >= limites.ldlMuitoAltoMin ||
    exame.ntProBnp > limites.ntProBnpRisco ||
    pontos >= 7
  ) {
    status = 'Risco cardiovascular alto'
    classe = 'critico'
    insight =
      'Há múltiplos marcadores cardiovasculares alterados. É recomendado procurar avaliação médica.'
  }

  return { pontos, status, classe, insight }
}

function TooltipCardio({ active, payload, label }) {
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

export default function RiscoCardiovascularChart() {
  const [abaAtiva, setAbaAtiva] = useState('lipidico')

  const ultimoExame = examesCardio[examesCardio.length - 1]

  const riscoAtual = calcularRiscoCardio(
    ultimoExame,
    paciente.idade,
    paciente.sexo,
    paciente.jejum12h
  )

  const limites = getLimitesCardio(
    paciente.idade,
    paciente.sexo,
    paciente.jejum12h
  )

  return (
    <div className="chart-hepatico">
      <div className="chart-header">
        <div>
          <h3>Risco Cardiovascular</h3>
          <p>Perfil lipídico, inflamação, marcadores cardíacos e pressão arterial</p>
        </div>

        <span className={`badge-risco ${riscoAtual.classe}`}>
          {riscoAtual.status}
        </span>
      </div>

      <div className="sub-chart-tabs">
        <button
          className={abaAtiva === 'lipidico' ? 'active' : ''}
          onClick={() => setAbaAtiva('lipidico')}
        >
          Perfil Lipídico
        </button>

        <button
          className={abaAtiva === 'marcadores' ? 'active' : ''}
          onClick={() => setAbaAtiva('marcadores')}
        >
          Marcadores
        </button>

        <button
          className={abaAtiva === 'pressao' ? 'active' : ''}
          onClick={() => setAbaAtiva('pressao')}
        >
          Pressão Arterial
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={examesCardio}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <Tooltip content={<TooltipCardio />} />
          <Legend />

          {abaAtiva === 'lipidico' && (
            <>
              <YAxis domain={[0, 260]} />

              <ReferenceArea y1={0} y2={70} fill="#22c55e" fillOpacity={0.06} />
              <ReferenceArea y1={70} y2={160} fill="#facc15" fillOpacity={0.06} />
              <ReferenceArea y1={160} y2={260} fill="#ef4444" fillOpacity={0.06} />

              <Line
                type="monotone"
                dataKey="ldl"
                stroke="#ef4444"
                strokeWidth={3}
                name="LDL mg/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="hdl"
                stroke="#22c55e"
                strokeWidth={3}
                name="HDL mg/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="naoHdl"
                stroke="#f97316"
                strokeWidth={3}
                name="Não-HDL mg/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="triglicerides"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Triglicérides mg/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="vldl"
                stroke="#a855f7"
                strokeWidth={3}
                name="VLDL mg/dL"
                dot={{ r: 5 }}
              />
            </>
          )}

          {abaAtiva === 'marcadores' && (
            <>
              <YAxis domain={[0, 190]} />

              <ReferenceArea y1={0} y2={125} fill="#22c55e" fillOpacity={0.06} />
              <ReferenceArea y1={125} y2={190} fill="#ef4444" fillOpacity={0.06} />

              <Line
                type="monotone"
                dataKey="pcrUs"
                stroke="#ef4444"
                strokeWidth={3}
                name="PCR-us mg/L"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="apoA1"
                stroke="#22c55e"
                strokeWidth={3}
                name="Apo-A1 mg/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="apoB"
                stroke="#f97316"
                strokeWidth={3}
                name="Apo-B mg/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="homocisteina"
                stroke="#a855f7"
                strokeWidth={3}
                name="Homocisteína µmol/L"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="ntProBnp"
                stroke="#3b82f6"
                strokeWidth={3}
                name="NT-proBNP pg/mL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="lpa"
                stroke="#14b8a6"
                strokeWidth={3}
                name="LP(a) mg/dL"
                dot={{ r: 5 }}
              />
            </>
          )}

          {abaAtiva === 'pressao' && (
            <>
              <YAxis domain={[60, 160]} />

              <ReferenceArea y1={60} y2={120} fill="#22c55e" fillOpacity={0.06} />
              <ReferenceArea y1={120} y2={140} fill="#facc15" fillOpacity={0.06} />
              <ReferenceArea y1={140} y2={160} fill="#ef4444" fillOpacity={0.06} />

              <Line
                type="monotone"
                dataKey="pressaoSistolica"
                stroke="#ef4444"
                strokeWidth={3}
                name="Sistólica mmHg"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="pressaoDiastolica"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Diastólica mmHg"
                dot={{ r: 5 }}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className={`chart-insight ${riscoAtual.classe}`}>
        <strong>Insight atual:</strong> {riscoAtual.insight}
      </div>

      <div className="limites-hepaticos">
        {abaAtiva === 'lipidico' && (
          <>
            <span>HDL mínimo: {limites.hdlMin} mg/dL</span>
            <span>LDL meta alto risco: &lt; {limites.ldlMetaAltoRisco} mg/dL</span>
            <span>Não-HDL meta: &lt; {limites.naoHdlMetaAdultoAltoRisco} mg/dL</span>
            <span>Triglicérides: &lt; {limites.trigliceridesMax} mg/dL</span>
            <span>VLDL: &lt; {limites.vldlMax} mg/dL</span>
          </>
        )}

        {abaAtiva === 'marcadores' && (
          <>
            <span>PCR-us baixo risco: &lt; 1 mg/L</span>
            <span>PCR-us alto risco: &gt; 3 mg/L</span>
            <span>Apo-A1: {limites.apoA1Min}–{limites.apoA1Max} mg/dL</span>
            <span>Apo-B: {limites.apoBMin}–{limites.apoBMax} mg/dL</span>
            <span>Homocisteína: {limites.homocisteinaMin}–{limites.homocisteinaMax} µmol/L</span>
            <span>NT-proBNP risco: &gt; {limites.ntProBnpRisco} pg/mL</span>
            <span>LP(a): até {limites.lpaMax} mg/dL</span>
          </>
        )}

        {abaAtiva === 'pressao' && (
          <>
            <span>120/80: sinal de alerta</span>
            <span>≥140/90: pressão elevada</span>
            <span>Medir 3 vezes com 1 min de intervalo</span>
          </>
        )}
      </div>
    </div>
  )
}