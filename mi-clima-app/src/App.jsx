import { useState } from "react";

const App = () => {
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false);

  const buscarClima = async () => {
    if (ciudad.trim() === "" || ciudad.trim().length < 3) return;
    setCargando(true);
    setError(false);
    try {
      const respuesta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=a1a92c33828f5e65ff4a04aa3998e22c&units=metric&lang=es`,
      );
      if (!respuesta.ok) {
        setError(true);
        setClima(null);
        console.log("Error de la API. Código:", respuesta.status);
        return;
      }
      const datos = await respuesta.json();
      setClima(datos);
      console.log(datos);
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    } finally {
      setCargando(false);
    }

    console.log("Buscando el clima de: ", ciudad);
  };
  return (
    <div>
      <h1>App del Clima</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Escribe una ciudad..."
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <button type="button" onClick={buscarClima}>
          Buscar
        </button>
      </form>
      {clima === null && !error && !cargando && (
        <p>Escribe el nombre de una ciudad para conocer el clima</p>
      )}
      {cargando && <p>Buscando el clima... un momento por favor ⏳</p>}
      {!cargando && !error && clima && (
        <div>
          <h2>
            Resultados para: {clima.name} {clima.sys.country}
          </h2>
          <p>Temperatura actual: {clima.main.temp}°C</p>
          <p>Sensacion termica: {clima.main.feels_like} °C</p>
          <p>humedad: {clima.main.humidity} °C</p>
          <p>Velocidad del viento: {clima.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
