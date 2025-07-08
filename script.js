// script.js

const form = document.getElementById('weather-form');
const resultDiv = document.getElementById('weather-result');
const API_KEY = '9078ae2b9a4568ed8c5ea57fed97e74c';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;

  resultDiv.textContent = 'Cargando...';

  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!resp.ok) throw new Error('Ciudad no encontrada');
    const data = await resp.json();

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperatura: ${data.main.temp} °C</p>
      <p>☁️ Estado: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Icono del clima" />
    `;
  } catch (err) {
    resultDiv.textContent = err.message;
  }
});
