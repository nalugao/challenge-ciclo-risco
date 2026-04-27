import "../style/tituloSubtitulo.css";

export default function TituloSubtitulo(props) {
  return (
    <>
      <h1 className="h1_titulo">{props.titulo}</h1>
      <p className="p_subtitulo">{props.subtitulo}</p>
    </>
  );
}
