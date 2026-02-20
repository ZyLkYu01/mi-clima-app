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
    const yaExiste = invitados.some(
      (invitado) => invitado.toLowerCase() === texto.trim().toLowerCase(),
    );
    if (yaExiste) {
      alert("Este invitado ya está en la lista.");
      return;
    }
    setInvitados([...invitados, texto.trim()]);
    setTexto("");
  };

  const eliminarInvitado = (indexABorrar) => {
    setInvitados(invitados.filter((_, i) => i !== indexABorrar));
  };

  const borrarTodo = () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres borrar a TODOS los invitados?",
    );
    if (confirmar) {
      setInvitados([]);
    }
  };

  return (
    <div className="contenedor">
      <h1>🎉 Lista de Invitados</h1>
      <p
        className="contador"
        style={{
          color: invitados.length > 10 ? "red" : "#666",
          fontWeight: invitados.length > 10 ? "bold" : "normal",
        }}
      >
        Tienes <strong>{invitados.length}</strong> invitados en la lista
      </p>
      <AgregarInvitado
        texto={texto}
        setTexto={setTexto}
        agregarInvitado={agregarInvitado}
        quedanEspacios={invitados.length < 15}
      />

      <ListaInvitados
        invitados={invitados}
        eliminarInvitado={eliminarInvitado}
      />
      {invitados.length > 0 && (
        <button className="btn-borrar-todo" onClick={borrarTodo}>
          Vaciar Lista
        </button>
      )}
    </div>
  );
}

export default App;
