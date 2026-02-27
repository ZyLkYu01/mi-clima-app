import { useState } from "react";
import "./App.css";

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
    <div className="container">
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

      {cargando && <p>Cargando...</p>}
      {error && <p>Ciudad no encontrada</p>}

      {clima && (
        <div className="weather-card">
          <h2>
            Resultados para: {clima.name} {clima.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
            alt={clima.weather[0].description}
          />
          <p style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {clima.weather[0].description}
          </p>
          <p>Temperatura actual: {clima.main.temp}°C</p>
          <p>Sensación térmica: {clima.main.feels_like}°C</p>
          <p>Humedad: {clima.main.humidity}%</p>
          <p>Velocidad del viento: {clima.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
