import CardInsight from "../../components/CardInsight";
import TituloSubtitulo from "../../components/TituloSubtitulo";
import './insights.css'
import Navbar from "../../components/Navbar";

export default function Insights() {
    const insightsData={
        titulo: "Principais Insights",
        subtitulo: "O que os dados nos dizem sobre os riscos dos esteroides anabolizantes."
    }

    const cardsInsights={
        correlacao: {
            titulo: "Baixa mortalidade direta, alto risco indireto",
            descricao: "As mortes relacionadas a esteroides são subnotificadas. A maioria dos óbitos decorre de eventos cardiovasculares, não de toxicidade aguda."
        },jovens: {
            titulo: "Jovens enfrentam riscos a longo prazo",
            descricao: "Usuários de 20 a 29 anos apresentam as maiores taxas de uso e o aumento mais acentuado de eventos cardíacos em uma década."
        },dependencia: {
            titulo: "A dependência psicológica é real",
            descricao: "30% dos usuários de longo prazo desenvolvem dismorfia corporal e dependência psicológica, dificultando a interrupção do uso."
        },educacao: {
            titulo: "Prevenção pela educação",
            descricao: "Estudos mostram que a educação baseada em dados reduz o primeiro uso em até 40% em grupos de risco."
        },
    }

    return(
        <section id="insights" className="insights_page">
            <TituloSubtitulo titulo={insightsData.titulo} subtitulo={insightsData.subtitulo}/>

            <div className="cards_container">
                <CardInsight titulo={cardsInsights.correlacao.titulo} descricao={cardsInsights.correlacao.descricao}/>
                <CardInsight titulo={cardsInsights.jovens.titulo} descricao={cardsInsights.jovens.descricao}/>
                <CardInsight titulo={cardsInsights.dependencia.titulo} descricao={cardsInsights.dependencia.descricao}/>
                <CardInsight titulo={cardsInsights.educacao.titulo} descricao={cardsInsights.educacao.descricao}/>
            </div>
        </section>
    )
}