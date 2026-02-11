import { useState } from "react";

const ListaDeInvitados = () => {
  const [invitados, setInvitados] = useState(["Batman", "Superman"]);

  const [texto, setTexto] = useState("");

  const agregarInvitado = () => {
    if (texto === "") return;
    setInvitados([...invitados, texto]);
    setTexto("");
  };

  const eliminarInvitado = (idBorrar) => {
    setInvitados(invitados.filter((_, index) => index !== idBorrar));
  };

  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)}></input>
      <button onClick={agregarInvitado}>Agregar invitado</button>
      <ul>
        {invitados.map((invitado, index) => (
          <li key={index}>
            {invitado}
            <button onClick={() => eliminarInvitado(index)}>
              Eliminar invitado
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeInvitados;
