import { useState, useEffect } from "react";
import "./App.css";
import AgregarInvitado from "./components/AgregarInvitado";
import ListaInvitados from "./components/ListaInvitados";

function App() {
  const [invitados, setInvitados] = useState(() => {
    const guardados = localStorage.getItem("mis_invitados");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [texto, setTexto] = useState("");

  useEffect(() => {
    localStorage.setItem("mis_invitados", JSON.stringify(invitados));
  }, [invitados]);

  const agregarInvitado = () => {
    if (texto.trim() === "") return;
    setInvitados([...invitados, texto]);
    setTexto("");
  };

  const eliminarInvitado = (indexABorrar) => {
    setInvitados(invitados.filter((_, i) => i !== indexABorrar));
  };

  return (
    <div className="contenedor">
      <h1>🎉 Lista de Invitados</h1>

      <AgregarInvitado
        texto={texto}
        setTexto={setTexto}
        agregarInvitado={agregarInvitado}
      />

      <ListaInvitados
        invitados={invitados}
        eliminarInvitado={eliminarInvitado}
      />
    </div>
  );
}

export default App;
