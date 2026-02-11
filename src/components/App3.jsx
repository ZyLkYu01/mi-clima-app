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
    <div className="contenedor">
      <h1>🎉 Lista de Invitados</h1>
      
      <div className="input-group">
        <input 
          value={texto} 
          onChange={(e) => setTexto(e.target.value)} 
          placeholder="Nombre del invitado..."
        />
        <button className="btn-agregar" onClick={agregarInvitado}>
          Invitar
        </button>
      </div>

      <ul>
        {invitados.map((invitado, index) => (
          <li key={index}>
            <span>{invitado}</span>
            <button 
              className="btn-eliminar" 
              onClick={() => eliminarInvitado(index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

export default ListaDeInvitados;
