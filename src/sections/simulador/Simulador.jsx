import { useState } from "react";
import "./simulador.css";

function calculateRiskScore({ age, sex, frequency, months, route, stacking }) {
  let pontos = 0;

  if (age < 18) {
    pontos += 30;
  } else if (age <= 25) {
    pontos += 15;
  }

  if (frequency === "Ocasional") {
    pontos += 10;
  } else if (frequency === "Frequente") {
    pontos += 25;
  } else {
    pontos += 40;
  }

  if (months <= 6) {
    pontos += 10;
  } else if (months <= 12) {
    pontos += 20;
  } else {
    pontos += 35;
  }

  if (sex === "Feminino") {
    pontos += 10;
  }

  if (route === "Oral") {
    pontos += 10;
  }

  if (route === "Ambos") {
    pontos += 20;
  }

  if (stacking) {
    pontos += 15;
  }

  if (pontos > 100) {
    pontos = 100;
  }

  return pontos;
}
// Define o nível de risco e a cor
function getRiskProfile(score) {
  if (score <= 20) return { label: "Baixo", hex: "#22c55e" };
  if (score <= 40) return { label: "Moderado", hex: "#eab308" };
  if (score <= 60) return { label: "Alto", hex: "#f97316" };
  if (score <= 80) return { label: "Muito Alto", hex: "#ef4444" };
  return { label: "Crítico", hex: "#dc2626" };
}

function getContextualMessages({
  age,
  sex,
  frequency,
  months,
  route,
  stacking,
  score,
}) {
  const msgs = [];

  if (age <= 18) {
    msgs.push({
      severity: "danger",
      title: "Você ainda está crescendo",
      text: "Antes dos 18 anos, o corpo ainda está se desenvolvendo e produzindo hormônios naturalmente. Usar anabolizantes nessa fase pode parar seu crescimento mais cedo e bagunçar seu sistema hormonal de forma permanente — ou seja, seu corpo pode nunca mais produzir testosterona direito.",
    });
  }

  if (age > 18 && age <= 25) {
    msgs.push({
      severity: "warning",
      title: "Seu sistema hormonal ainda está se ajustando",
      text: "Entre 18 e 25 anos, a testosterona natural ainda está chegando no seu pico. Usar anabolizantes agora pode interromper esse processo de forma irreversível, fazendo você perder o melhor momento hormonal da sua vida.",
    });
  }

  if (sex === "Feminino") {
    msgs.push({
      severity: "danger",
      title: "Risco muito maior para mulheres",
      text: "O corpo feminino reage de forma muito mais intensa aos anabolizantes. O uso pode causar engrossamento permanente da voz, crescimento do clitóris e aparecimento de pelos no rosto e corpo, além de desregular o ciclo menstrual. O pior: muitos desses efeitos não somem mesmo se você parar.",
    });

    if (frequency === "Intenso") {
      msgs.push({
        severity: "danger",
        title: "Risco de masculinização permanente",
        text: "Com uso intenso, as chances de mudanças físicas irreversíveis são altíssimas. Alterações como mudança na voz e crescimento do clitóris são permanentes porque afetam a estrutura dos tecidos — não tem como desfazer, mesmo anos depois de parar.",
      });
    }

    if (stacking) {
      msgs.push({
        severity: "danger",
        title: "Combinação especialmente perigosa para mulheres",
        text: "Usar mais de um anabolizante ao mesmo tempo multiplica o risco de masculinização e problemas hormonais graves. Cada substância a mais aumenta muito as chances de efeitos permanentes no corpo.",
      });
    }
  }

  if (route === "Oral") {
    msgs.push({
      severity: "warning",
      title: "Anabolizantes orais prejudicam o fígado",
      text: "Os anabolizantes em comprimido são feitos para não serem destruídos pelo fígado — mas isso faz com que ele acumule toxinas. Com o tempo, isso pode causar lesões sérias no fígado, que muitas vezes não dão sintomas até estarem avançadas. Exames regulares são fundamentais.",
    });
  }

  if (route === "Ambos") {
    msgs.push({
      severity: "danger",
      title: "Dobro de dano no fígado",
      text: "Misturar anabolizantes orais e injetáveis sobrecarrega o fígado dos dois lados ao mesmo tempo. Os comprimidos já são agressivos por si só — junto com os injetáveis, o risco de lesão hepática grave aumenta consideravelmente.",
    });
  }

  if (stacking) {
    msgs.push({
      severity: "danger",
      title: "Usar várias substâncias ao mesmo tempo é muito arriscado",
      text: "Combinar mais de um anabolizante suprime ainda mais a produção natural de hormônios, prejudica o coração (baixa o colesterol bom e sobe o ruim) e dificulta saber qual substância está causando qual problema. A recuperação depois do ciclo também fica muito mais difícil.",
    });
  }

  if (months >= 24) {
    msgs.push({
      severity: "warning",
      title: "Risco de nunca mais produzir testosterona naturalmente",
      text: "Depois de 2 anos ou mais de uso, o corpo pode perder a capacidade de produzir testosterona sozinho — para sempre. Muitos usuários de longo prazo acabam precisando tomar hormônio artificial pelo resto da vida.",
    });
  }

  if (months >= 12 && (route === "Oral" || route === "Ambos")) {
    msgs.push({
      severity: "warning",
      title: "Dano acumulado no fígado",
      text: "Mais de 12 meses usando anabolizantes orais aumenta muito o risco de dano permanente no fígado. O problema é que essas lesões costumam não dar sintomas visíveis no começo — quando aparecem, já podem estar em estágio avançado.",
    });
  }

  if (frequency !== "Ocasional" && months >= 6) {
    msgs.push({
      severity: "info",
      title: "Risco para o coração",
      text: "Usar anabolizantes com regularidade prejudica o colesterol, aumenta a pressão arterial e sobrecarrega o coração. Essa combinação aumenta o risco de infarto e AVC mesmo em pessoas jovens e que parecem saudáveis.",
    });
  }

  if (score >= 80) {
    msgs.push({
      severity: "danger",
      title: "Situação de risco grave",
      text: "O conjunto de informações que você inseriu indica um risco muito sério à sua saúde. Danos no coração, fígado e sistema hormonal nesse nível costumam ser permanentes. Se você está nessa situação, procure um médico especialista — endocrinologista ou cardiologista — o quanto antes.",
    });
  }

  return msgs;
}

function formatDuration(months) {
  if (months < 12) return `${months} ${months === 1 ? "mês" : "meses"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} ${years === 1 ? "ano" : "anos"}`;
  return `${years}a ${rem}m`;
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="d-flex gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`btn flex-fill fw-medium ${
            value === opt ? "btn-danger" : "btn-outline-secondary"
          }`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function MessageCard({ severity, title, text }) {
  return (
    <div className={`sim-msg sim-msg--${severity} mb-2`}>
      <div className="d-flex align-items-center gap-2 mb-1">
        <span className={`sim-msg__dot sim-msg__dot--${severity}`} />
        <strong className={`sim-msg__title sim-msg__title--${severity}`}>
          {title}
        </strong>
      </div>
      <p className="sim-msg__text mb-0">{text}</p>
    </div>
  );
}

export default function Simulador() {
 
  const [age, setAge] = useState(25);
  const [sex, setSex] = useState("Masculino");
  const [frequency, setFrequency] = useState("Ocasional");
  const [duration, setDuration] = useState(6);
  const [route, setRoute] = useState("Injetável");
  const [stacking, setStacking] = useState(false);


  const [result, setResult] = useState(null); 
  const [messages, setMessages] = useState([]); 

  function handleCalculate() {
    const params = {
      age,
      sex,
      frequency,
      months: duration,
      route,
      stacking,
    };

    const score = calculateRiskScore(params);

    const msgs = getContextualMessages({
      ...params,
      score,
    });

    setResult(score);
    setMessages(msgs);
  }

  const profile = result !== null ? getRiskProfile(result) : null;

  return (
    <section className="sim-wrapper py-5" data-bs-theme="dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            {/* Cabeçalho */}
            <h2 className="text-center text-white fw-bold mb-2">
              Simulador de <span className="text-danger">Risco</span>
            </h2>
            <p className="text-center text-secondary small mb-4">
              Estime seu perfil de risco com base no seu histórico de uso.
            </p>

            {/* Card do formulário */}
            <div className="sim-card p-4">
              {/* Idade */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-1">
                  Idade: <strong className="text-white">{age}</strong>
                </label>
                <input
                  type="range"
                  className="form-range sim-range"
                  min={15}
                  max={60}
                  step={1}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between sim-ticks">
                  <span>15</span>
                  <span>60</span>
                </div>
              </div>

              {/* Sexo biológico */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-2">
                  Sexo biológico
                </label>
                <ToggleGroup
                  options={["Masculino", "Feminino"]}
                  value={sex}
                  onChange={setSex}
                />
              </div>

              {/* Frequência de uso */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-2">
                  Frequência de uso
                </label>
                <ToggleGroup
                  options={["Ocasional", "Frequente", "Intenso"]}
                  value={frequency}
                  onChange={setFrequency}
                />
              </div>

              {/* Duração */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-1">
                  Duração:{" "}
                  <strong className="text-white">
                    {formatDuration(duration)}
                  </strong>
                </label>
                <input
                  type="range"
                  className="form-range sim-range"
                  min={1}
                  max={60}
                  step={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between sim-ticks">
                  <span>1 mês</span>
                  <span>5 anos</span>
                </div>
              </div>

              {/* Via de administração */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-2">
                  Via de administração
                </label>
                <ToggleGroup
                  options={["Injetável", "Oral", "Ambos"]}
                  value={route}
                  onChange={setRoute}
                />
              </div>

              {/* Usa mais de um composto */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-2">
                  Usa mais de um composto?
                </label>
                <ToggleGroup
                  options={["Não", "Sim"]}
                  value={stacking ? "Sim" : "Não"}
                  onChange={(v) => setStacking(v === "Sim")}
                />
              </div>

              {/* Botão de cálculo */}
              <button
                className="btn btn-danger w-100 py-2 fw-semibold"
                onClick={handleCalculate}
              >
                Calcular Risco
              </button>

              {/* Bloco de resultado — só aparece após o cálculo */}
              {result !== null && profile && (
                <div className="mt-4">
                  {/* Score */}
                  <div
                    className="sim-result text-center p-4 rounded-3 mb-3"
                    style={{
                      border: `1px solid ${profile.hex}44`,
                      background: `${profile.hex}11`,
                    }}
                  >
                    <div className="sim-score" style={{ color: profile.hex }}>
                      {result}%
                    </div>
                    <div
                      className="fw-semibold mt-1"
                      style={{ color: profile.hex }}
                    >
                      Risco {profile.label}
                    </div>
                    <div className="progress sim-progress mt-3">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${result}%`, background: profile.hex }}
                        aria-valuenow={result}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small className="text-muted d-block mt-2">
                      Score calculado com base em todos os fatores clínicos
                      combinados
                    </small>
                  </div>

                  {/* Mensagens contextuais */}
                  {messages.length > 0 && (
                    <>
                      <p className="sim-msg-header">
                        {messages.length} fator{messages.length > 1 ? "es" : ""}{" "}
                        de risco identificado{messages.length > 1 ? "s" : ""}
                      </p>
                      {messages.map((msg, i) => (
                        <MessageCard key={i} {...msg} />
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
            {/* /sim-card */}
          </div>
        </div>
      </div>
    </section>
  );
}
