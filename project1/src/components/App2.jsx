import { useState } from "react";

const ListaTareas = () => {
  const [tareas, setTareas] = useState([
    { texto: "Aprender React", completada: false },
    { texto: "Comer tacos", completada: true },
  ]);
  const [nuevoTexto, setNuevoTexto] = useState("");

  const agregarTarea = () => {
    if (nuevoTexto === "") return;
    // Agregamos el objeto nuevo
    setTareas([...tareas, { texto: nuevoTexto, completada: false }]);
    setNuevoTexto("");
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  // 👇 ESTA ES LA FUNCIÓN NUEVA
  const toggleCompletada = (index) => {
    const nuevasTareas = tareas.map((tarea, i) => {
      if (i === index) {
        // Si es la tarea que buscamos, invertimos su valor 'completada'
        // !tarea.completada significa: "Si era true, hazlo false. Si era false, hazlo true"
        return { ...tarea, completada: !tarea.completada };
      }
      // Si no es la que buscamos, la dejamos igual
      return tarea;
    });

    setTareas(nuevasTareas);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mis Pendientes</h1>

      <input
        value={nuevoTexto}
        onChange={(e) => setNuevoTexto(e.target.value)}
      />
      <button onClick={agregarTarea}>Agregar</button>

      <div style={{ marginTop: "20px" }}>
        {tareas.map((tarea, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              borderBottom: "1px solid #ccc",
              padding: "5px",
            }}
          >
            {/* 👇 AQUÍ CONECTAMOS EL CLIC:
               Al hacer clic en el texto, llamamos a toggleCompletada 
            */}
            <span
              onClick={() => toggleCompletada(index)}
              style={{
                cursor: "pointer",
                // Si completada es true, tachamos. Si no, nada.
                textDecoration: tarea.completada ? "line-through" : "none",
                color: tarea.completada ? "gray" : "black",
              }}
            >
              {tarea.texto}
            </span>

            <button
              onClick={() => eliminarTarea(index)}
              style={{ background: "red", color: "white", marginLeft: "10px" }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaTareas;
