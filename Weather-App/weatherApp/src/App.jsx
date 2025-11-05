import { useState, useEffect } from "react";
import Weather from "./components/Weather";

export default function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(""); // 👈 error message-ի state

  const apiKey = "f41d35da3a32b8d18d3e659c2bec4321";

  function handleChange(e) {
    setInput(e.target.value);
    setError(""); // reset error when typing
  }

  async function getWeather(cityName) {
    const city = cityName || input || "Yerevan";

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setWeather(null);
        setError("❌ The city was not found. Try again!");
      } else {
        setWeather(data);
        setError("");
      }
    } catch (error) {
      console.error("An error:", error);
      setError("⚠️ Something went wrong. Please try later.");
    }
  }

  useEffect(() => {
    getWeather("Yerevan");
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      getWeather();
    }
  }

  return (
    <div className="weather-card">
      <div className="input">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter the city"
          className="inputFiled"
        />
        <button onClick={() => getWeather()}>Search</button>
      </div>
      {error && <div className="error-box">{error}</div>}

      <Weather weather={weather} />
    </div>
  );
}
