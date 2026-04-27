import '../style/cardGraphPainel.css'

export default function CardGraphPainel(props) {
    return(
        <div className="card_painel">
            <p className='texto_descricao'>{props.descricao}</p>
        </div>
    )
}