export const MOCK_DATA = {
    perfil: {
        nome: 'Rafael Mendes',
        idade: 28,
        tempoUso: '14 meses',
        dosagem: '500mg/sem',
        esteroides: ['Testosterona Enantato', 'Trembolona', 'Oxandrolona'],
        nivelRisco: 'alto',
        avatar: 'RM',
        ultimoExame: '12 abr 2025',
    },

    metricas: [
        {
            id: 'testosterona',
            label: 'Testosterona',
            valor: '4.100',
            unidade: 'ng/dL',
            delta: '+14% vs. mar',
            deltaDir: 'up',
            cor: '#c084fc',
        },
        {
            id: 'ldl',
            label: 'LDL',
            valor: '178',
            unidade: 'mg/dL',
            delta: '+10% vs. mar · limite 130',
            deltaDir: 'up',
            cor: '#c0392b',
        },
        {
            id: 'tgo',
            label: 'TGO / TGP',
            valor: '112',
            unidade: 'U/L',
            delta: '+18% vs. mar · limite 40',
            deltaDir: 'up',
            cor: '#d97706',
        },
        {
            id: 'hdl',
            label: 'HDL',
            valor: '24',
            unidade: 'mg/dL',
            delta: '-14% vs. mar · ideal >40',
            deltaDir: 'down',
            cor: '#27ae60',
        },
    ],

    alertas: [
        {
            id: 1,
            nivel: 'alto',
            titulo: 'Risco cardiovascular',
            descricao: 'LDL 37% acima do limite. HDL em queda por 4 meses.',
        },
        {
            id: 2,
            nivel: 'alto',
            titulo: 'Sobrecarga hepática',
            descricao: 'TGO/TGP 2,5× acima do limite superior.',
        },
        {
            id: 3,
            nivel: 'atencao',
            titulo: 'Supressão hormonal',
            descricao: 'Eixo HPT comprometido. Testosterona endógena suprimida.',
        },
        {
            id: 4,
            nivel: 'atencao',
            titulo: 'Policitemia secundária',
            descricao: 'Hematócrito elevado. Risco tromboembólico aumentado.',
        },
    ],

    exames: [
        { id: 1, nome: 'Hemograma completo', data: '12 abr', tipo: 'sangue', cor: '#60a5fa', resultado: 'alterado' },
        { id: 2, nome: 'Perfil lipídico', data: '12 abr', tipo: 'sangue', cor: '#60a5fa', resultado: 'alterado' },
        { id: 3, nome: 'Painel hormonal', data: '10 mar', tipo: 'hormonal', cor: '#c084fc', resultado: 'alterado' },
        { id: 4, nome: 'TGO / TGP', data: '10 mar', tipo: 'hepático', cor: '#fb923c', resultado: 'alterado' },
        { id: 5, nome: 'Creatinina', data: '15 fev', tipo: 'renal', cor: '#34d399', resultado: 'normal' },
        { id: 6, nome: 'Ecocardiograma', data: '20 jan', tipo: 'cardíaco', cor: '#f472b6', resultado: 'pendente' },
    ],

    insights: [
        { id: 1, num: '01', texto: 'LDL cresceu', destaque: '+87%', resto: 'em 6 meses — progressão linear sem sinais de reversão' },
        { id: 2, num: '02', texto: 'HDL caiu', destaque: '54%', resto: 'desde o início do ciclo — razão LDL/HDL agora em 7,4 (ideal < 3,5)' },
        { id: 3, num: '03', texto: 'Enzimas hepáticas', destaque: 'dobraram', resto: 'desde janeiro — padrão compatível com colestase' },
        { id: 4, num: '04', texto: 'Nenhum exame cardíaco nos últimos', destaque: '90 dias', resto: '— ecocardiograma em aberto' },
        { id: 5, num: '05', texto: 'Combinação Trembolona + Enantato associada a', destaque: 'maior supressão', resto: 'do eixo HPT' },
    ],

    chartData: {
        meses: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
        colesterol: {
            ldl: [95, 108, 122, 139, 155, 162, 178],
            hdl: [52, 48, 41, 36, 31, 28, 24],
            limite: 130,
        },
        testosterona: {
            total: [620, 1850, 2400, 3100, 2800, 3600, 4100],
            limite: 900,
        },
        hepatico: {
            tgo: [28, 35, 48, 62, 78, 95, 112],
            tgp: [24, 30, 44, 58, 71, 88, 104],
            limite: 40,
        },
    },
}