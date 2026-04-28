import TituloSubtitulo from "../../components/TituloSubtitulo";
import './simulador.css'
import Navbar from "../../components/Navbar";

export default function Simulador() {
    const simulatorData = {
        titulo: "Simulador de Risco",
        subtitulo: "Estime seu perfil de risco com base na idade, frequência de uso e duração",
        variante: "escuto"
    }
    return(
        <section id="simulador" className="simulador_page">
            <TituloSubtitulo titulo={simulatorData.titulo} subtitulo={simulatorData.subtitulo} variante={simulatorData.variante}/>
            {/* INSERIR O SIMULADOR AQUI */}
            <div className="simulador">
                <p>Simulador</p>
            </div>
        </section>
    )
}