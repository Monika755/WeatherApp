export default function Weather({ weather }) {
  if (!weather || !weather.main) {
    return null; 
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="result">
      <h2>{weather.name}</h2>
      <p>{weather.main.temp}°C</p>
      <p>{weather.weather[0].main}</p>
      <img
        src={iconUrl}
        alt="weather-icon"
        className="weather-icon"
      />
    </div>
  );
}