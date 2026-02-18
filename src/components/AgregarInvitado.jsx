import "./AgregarInvitado.css";
const AgregarInvitado = ({ texto, setTexto, agregarInvitado }) => {
  return (
    <div className="input-group">
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nombre del invitado..."
        onKeyPress={(e) => e.key === "Enter" && agregarInvitado()}
      />
      <button className="btn-agregar" onClick={agregarInvitado}>
        Invitar
      </button>
    </div>
  );
};

export default AgregarInvitado;
