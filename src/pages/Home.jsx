import Inicio from '../sections/inicio/Inicio'
import Painel from '../sections/painel/Painel'
import MapaCorporal from '../sections/mapaCorporal/MapaCorporal'
import Simulador from '../sections/simulador/Simulador'
import Insights from '../sections/insights/Insights'

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
}