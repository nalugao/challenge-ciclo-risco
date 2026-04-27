import Inicio from '../sections/inicio/Inicio'
import Insights from '../sections/insights/Insights'
import MapaCorporal from '../sections/mapaCorporal/MapaCorporal'
import Painel from '../sections/painel/Painel'
import Simulador from '../sections/simulador/Simulador'
import '../style/home.css'

export default function Home() {
    return (
        <>
        <Inicio />
        <Painel />
        <MapaCorporal />
        <Simulador />
        <Insights />
        </>
    )
};