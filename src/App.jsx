import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 1. Iniciamos el estado intentando leer del cajón (localStorage)
  const [invitados, setInvitados] = useState(() => {
    const guardados = localStorage.getItem("mis_invitados");
    // Si hay algo, lo convertimos de texto a lista; si no, empezamos con lista vacía
    return guardados ? JSON.parse(guardados) : [];
  });

  const [texto, setTexto] = useState("");

  // 2. Este "centinela" guarda en el cajón cada vez que la lista cambie
  useEffect(() => {
    localStorage.setItem("mis_invitados", JSON.stringify(invitados));
  }, [invitados]);

  const agregarInvitado = () => {
    if (texto.trim() === "") return;
    // La fórmula del acordeón: [ ...viejo, nuevo ]
    setInvitados([...invitados, texto]);
    setTexto(""); // Limpiamos el input
  };

  const eliminarInvitado = (indexABorrar) => {
    // Filtramos para dejar solo los que NO coincidan con el índice
    const nuevaLista = invitados.filter((_, i) => i !== indexABorrar);
    setInvitados(nuevaLista);
  };

  return (
    <div className="contenedor">
      <h1>🎉 Lista de Invitados</h1>

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
        <p style={{ textAlign: "center", color: "#888" }}>
          No hay invitados aún.
        </p>
      )}
    </div>
  );
}

export default App;
