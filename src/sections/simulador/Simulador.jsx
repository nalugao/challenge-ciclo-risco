import TituloSubtitulo from "../../components/TituloSubtitulo";
import './simulador.css'
import Navbar from "../../components/Navbar";

export default function Simulador() {
    const simulatorData = {
        titulo: "Simulador de Risco",
        subtitulo: "Estime seu perfil de risco com base na idade, frequência de uso e duração"
    }
    return(
        <section id="simulador" className="simulador_page">
            <TituloSubtitulo titulo={simulatorData.titulo} subtitulo={simulatorData.subtitulo} />
            {/* INSERIR O SIMULADOR AQUI */}
        </section>
    )
}