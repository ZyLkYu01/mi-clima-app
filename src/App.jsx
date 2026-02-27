import { useState, useEffect } from "react";
import "./App.css";
import AgregarInvitado from "./components/AgregarInvitado";
import ListaInvitados from "./components/ListaInvitados";

function App() {
  const [invitados, setInvitados] = useState(() => {
    const guardados = localStorage.getItem("mis_invitados");
    return guardados ? JSON.parse(guardados) : [];
  });

  const cargarInvitadosDeInternet = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const datos = await respuesta.json();
      const nombresDeInternet = datos.map((u) => u.name);
      setInvitados(nombresDeInternet);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (invitados.length === 0) {
      cargarInvitadosDeInternet();
    }
  }, []);

  const [texto, setTexto] = useState("");

  const [busqueda, setBusqueda] = useState("");
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
    let nombreAGuardar = texto.trim();
    if (nombreAGuardar === nombreAGuardar.toUpperCase()) {
      nombreAGuardar = "⭐ " + nombreAGuardar;
    }
    setInvitados([...invitados, nombreAGuardar]);

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
  const invitadosFiltrados = invitados.filter((invitado) =>
    invitado.toLowerCase().includes(busqueda.toLowerCase()),
  );
  return (
    <div className="contenedor">
      <h1>🎉 Lista de Invitados</h1>
      <button className="btn-api" onClick={cargarInvitadosDeInternet}>
        🌐 Cargar invitados desde Internet
      </button>
      <p className={`contador ${invitados.length > 10 ? "lleno" : ""}`}>
        Tienes <strong>{invitados.length}</strong> invitados en la lista
      </p>
      <AgregarInvitado
        texto={texto}
        setTexto={setTexto}
        agregarInvitado={agregarInvitado}
        quedanEspacios={invitados.length < 15}
      />
      {invitados.length > 0 && (
        <input
          type="text"
          placeholder="🔍 Buscar invitado..."
          className="input-busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      )}
      {cargando ? (
        <p className="mensaje-carga">⏳ Obteniendo invitados de internet...</p>
      ) : (
        <ListaInvitados
          invitados={invitadosFiltrados}
          eliminarInvitado={eliminarInvitado}
        />
      )}
      {invitados.length > 0 && (
        <button className="btn-borrar-todo" onClick={borrarTodo}>
          Vaciar Lista
        </button>
      )}
    </div>
  );
}

export default App;
