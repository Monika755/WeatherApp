# Weather App 🌤️

A simple React app to check the current weather of any city using the **OpenWeatherMap API**. Users can search for cities, view temperature and weather conditions, and handle errors gracefully.

---

## Features

- Search weather by city name  
- Display temperature (°C) and weather description  
- Default city: **Yerevan**  
- Error handling for invalid cities or network issues  
- Press **Enter** or click **Search** to fetch weather  

---


## Installation

```bash
git clone https://github.com/Monika755/WeatherApp.git
cd weather-app
npm install
npm run dev
Open your browser at http://localhost:5173 (Vite default).

Usage
Enter a city in the input field.

Press Enter or click Search.

View the current weather or an error message if the city is invalid.

API Key
Replace the API key in App.js with your own:

const apiKey = "YOUR_API_KEY";
Get a free API key from OpenWeatherMap.

Project Structure

weather-app/
│
├─ src/
│  ├─ components/
│  │  └─ Weather.js
│  ├─ App.jsx
│  └─ index.jsx
│
├─ public/
│  └─ index.html
│
└─ package.json
Future Improvements
Multi-day forecast

Dynamic weather icons

Celsius/Fahrenheit toggle

Improved responsive design

