import "./AgregarInvitado.css";
const AgregarInvitado = ({
  texto,
  setTexto,
  agregarInvitado,
  quedanEspacios,
}) => {
  return (
    <div className="input-group">
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nombre del invitado..."
        onKeyPress={(e) => e.key === "Enter" && agregarInvitado()}
      />
      <button
        className={`btn-agregar ${!quedanEspacios ? "lleno" : ""}`}
        onClick={agregarInvitado}
        disabled={!quedanEspacios}
      >
        {quedanEspacios ? "Invitar" : "Lleno"}
      </button>
    </div>
  );
};

export default AgregarInvitado;
