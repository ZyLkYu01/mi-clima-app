import "./ListaInvitados.css";

const ListaInvitados = ({ invitados, eliminarInvitado }) => {
  return (
    <>
      <ul>
        {invitados.map((invitado, index) => (
          <li key={index}>
            <span>{invitado}</span>
            <button
              className="btn-eliminar"
              onClick={() => eliminarInvitado(index)}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
      {invitados.length === 0 && (
        <p className="sin-invitados">No hay invitados aún.</p>
      )}
    </>
  );
};

export default ListaInvitados;
