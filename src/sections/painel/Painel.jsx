import CardGraphPainel from "../../components/CardGraphPainel";
import CardPainel from "../../components/CardPainel";
import TituloSubtitulo from "../../components/TituloSubtitulo";
import "./painel.css";
import Navbar from "../../components/Navbar";

export default function Painel() {
  const painelData = {
    titulo: "Os dados por trás do uso de anabolizantes",
    subtitulo:
      "Padrões de dados reais mostrando o impacto crescente do uso indevido de esteroides anabolizantes.",
    variante: "claro",
  };

  const cardsInfo = {
    usuariosAtivos: {
      icone: "",
      alt: "",
      estatistica: "3,3%",
      descricao: "dos frequentadores de academia usam esteroides no mundo",
    },

    mortalidade: {
      icone: "",
      alt: "",
      estatistica: "2-3x",
      descricao: "maior risco de mortalidade cardiovascular em usuários",
    },

    dependencia: {
      icone: "",
      alt: "",
      estatistica: "30%",
      descricao: "dos usuários desenvolvem dependência em 2 anos",
    },

    perfil: {
      icone: "",
      alt: "",
      estatistica: "78%",
      descricao: "das mortes são entre usuários de 20 a 39 anos",
    },
  };

  const cardsGraph = {
    relacaoEsteroides: {
      descricao: `Perigo para o Coração
• Infarto: Usuários têm 3x mais risco de sofrer um ataque cardíaco.
• Cardiomiopatia: O risco de desenvolver danos graves na musculatura do coração é quase 9x maior.`,
      fonteNome: "Associação Americana do Coração, revista Circulation",
      link: "https://www.ahajournals.org/journal/circ",
    },
    idade: {
      descricao: ` Um Problema em Crescimento
• Estima-se que 3,3% da população geral faça uso dessas substâncias (6,4% dos homens e 1,6% das mulheres).
• O perigo dispara no ambiente esportivo: o uso chega a 13,4% entre atletas e a impressionantes 18,4% entre praticantes de atividade física.`,
      fonteNome: "Sociedade Brasileira de Endocrinologia e Metabologia",
      link: "https://www.endocrino.org.br/",
    },
    genero: {
      descricao: ` Comportamento de Risco
• O uso de esteroides está fortemente associado ao abuso de outras substâncias. Quem consome anabolizantes tem uma frequência muito maior de dependência de álcool, nicotina e cocaína.`,
      fonteNome: "Sociedade Brasileira de Endocrinologia e Metabologia",
      link: "https://www.endocrino.org.br/",
    },
    pesquisa: {
      descricao: ` Efeitos Irreversíveis em Mulheres
• Para o público feminino, as marcas da masculinização (virilização) podem ser permanentes: engrossamento definitivo da voz, hipertrofia do clitóris e crescimento de pelos faciais.
• Extra: Aumento da resistência à insulina e risco de ruptura dos tendões chega a ser 9x maior.`,
      fonteNome: "Scielo, 2014 e SBEM, 2022",
      link: "https://www.scielo.br/",
    },
  };

  return (
    <section id="painel" className="painel_page">
      <TituloSubtitulo
        titulo={painelData.titulo}
        subtitulo={painelData.subtitulo}
        variante={painelData.variante}
      />
      <div className="card_container">
        <CardPainel
          icone={cardsInfo.usuariosAtivos.icone}
          alt={cardsInfo.usuariosAtivos.alt}
          estatistica={cardsInfo.usuariosAtivos.estatistica}
          descricao={cardsInfo.usuariosAtivos.descricao}
        />
        <CardPainel
          icone={cardsInfo.mortalidade.icone}
          alt={cardsInfo.mortalidade.alt}
          estatistica={cardsInfo.mortalidade.estatistica}
          descricao={cardsInfo.mortalidade.descricao}
        />
        <CardPainel
          icone={cardsInfo.dependencia.icone}
          alt={cardsInfo.dependencia.alt}
          estatistica={cardsInfo.dependencia.estatistica}
          descricao={cardsInfo.dependencia.descricao}
        />
        <CardPainel
          icone={cardsInfo.perfil.icone}
          alt={cardsInfo.perfil.alt}
          estatistica={cardsInfo.perfil.estatistica}
          descricao={cardsInfo.perfil.descricao}
        />
      </div>
      <div className="graph_container_painel">
        {/*INSERIR GRAFICOS AQUI */}
       <CardGraphPainel 
          descricao={cardsGraph.relacaoEsteroides.descricao} 
          fonteNome={cardsGraph.relacaoEsteroides.fonteNome}
          link={cardsGraph.relacaoEsteroides.link}
        />
        <CardGraphPainel 
          descricao={cardsGraph.idade.descricao} 
          fonteNome={cardsGraph.idade.fonteNome}
          link={cardsGraph.idade.link}
        />
        <CardGraphPainel 
          descricao={cardsGraph.genero.descricao} 
          fonteNome={cardsGraph.genero.fonteNome}
          link={cardsGraph.genero.link}
        />
        <CardGraphPainel 
          descricao={cardsGraph.pesquisa.descricao} 
          fonteNome={cardsGraph.pesquisa.fonteNome}
          link={cardsGraph.pesquisa.link}
        />
      </div>
    </section>
  );
}
