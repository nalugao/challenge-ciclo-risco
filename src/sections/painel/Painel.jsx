import CardGraphPainel from "../../components/CardGraphPainel"
import CardPainel from "../../components/CardPainel"
import TituloSubtitulo from "../../components/TituloSubtitulo"
import './painel.css'
import Navbar from "../../components/Navbar"

export default function Painel() {
    const painelData = {
        titulo: "Os dados por trás do uso de anabolizantes",
        subtitulo: "Padrões de dados reais mostrando o impacto crescente do uso indevido de esteroides anabolizantes.",
        variante: "claro"
    }

    const cardsInfo = {
        usuariosAtivos: {
            icone: "",
            alt: "",
            estatistica: "3,3%",
            descricao: "dos frequentadores de academia usam esteroides no mundo"
        },

        mortalidade: {
            icone: "",
            alt: "",
            estatistica: "2-3x",
            descricao: "maior risco de mortalidade cardiovascular em usuários"
        },

        dependencia: {
            icone: "",
            alt: "",
            estatistica: "30%",
            descricao: "dos usuários desenvolvem dependência em 2 anos"
        },

        perfil: {
            icone: "",
            alt: "",
            estatistica: "78%",
            descricao: "das mortes são entre usuários de 20 a 39 anos"
        }
    }

    const cardsGraph = {
        relacaoEsteroides: {
            descricao: "Mortes relacionadas a esteroides ao longo do tempo"
        },
        idade: {
            descricao: "Usuários por faixa etária"
        },
        genero: {
            descricao: "Distribuição por gênero"
        },
        pesquisa: {
            descricao: "Descoberta principal"
        },
    }

    return (
        <section id="painel" className="painel_page">
            <TituloSubtitulo titulo={painelData.titulo} subtitulo={painelData.subtitulo} variante={painelData.variante} />
            <div className="card_container">
                <CardPainel icone={cardsInfo.usuariosAtivos.icone} alt={cardsInfo.usuariosAtivos.alt} estatistica={cardsInfo.usuariosAtivos.estatistica} descricao={cardsInfo.usuariosAtivos.descricao} />
                <CardPainel icone={cardsInfo.mortalidade.icone} alt={cardsInfo.mortalidade.alt} estatistica={cardsInfo.mortalidade.estatistica} descricao={cardsInfo.mortalidade.descricao} />
                <CardPainel icone={cardsInfo.dependencia.icone} alt={cardsInfo.dependencia.alt} estatistica={cardsInfo.dependencia.estatistica} descricao={cardsInfo.dependencia.descricao} />
                <CardPainel icone={cardsInfo.perfil.icone} alt={cardsInfo.perfil.alt} estatistica={cardsInfo.perfil.estatistica} descricao={cardsInfo.perfil.descricao} />
            </div>
            <div className="graph_container_painel">
                {/*INSERIR GRAFICOS AQUI */}
                <CardGraphPainel descricao={cardsGraph.relacaoEsteroides.descricao} />
                <CardGraphPainel descricao={cardsGraph.idade.descricao} />
                <CardGraphPainel descricao={cardsGraph.genero.descricao} />
                <CardGraphPainel descricao={cardsGraph.pesquisa.descricao} />
            </div>
        </section>
    )
}