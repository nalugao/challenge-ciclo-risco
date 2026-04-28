import HumanBody from "../../components/HumanBody"
import TituloSubtitulo from "../../components/TituloSubtitulo"
import './mapa_corporal.css'
import Navbar from "../../components/Navbar"

export default function MapaCorporal() {
    const mapaData = {
        titulo: "Impacto no Seu Corpo",
        subtitulo: "Clique em cada órgão para saber como os esteroides anabolizantes o afetam."
    }

    return (
        <section id="mapa-corporal" className="mapa_corporal_page">
            <TituloSubtitulo titulo={mapaData.titulo} subtitulo={mapaData.subtitulo} />
                    <HumanBody />
        </section>
    )
}