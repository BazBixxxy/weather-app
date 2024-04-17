import "../stylesheets/general.css";
import "../stylesheets/sidebar.css";
import "../stylesheets/styles.css";
import "../stylesheets/media.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import { add, format } from "date-fns";

const searchIcon = document.querySelector(".fa-magnifying-glass");

async function getWeatherData() {
  const dateDisplay = document.querySelector(".date-display");
  const weatherDisplay = document.querySelector(".weather-display");
  const cityDisplay = document.querySelector(".city-display");
  const temperatureDisplay = document.getElementById("temp-display");
  const windDisplay = document.querySelector(".wind-display");

  const bodyElement = document.querySelector("body");
  const weather = document.getElementById("weather");

  const searchElement = document.getElementById("input");

  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM do, yyyy");

  console.log(formattedDate);

  document.querySelector("nav > .right").innerHTML = `
        ${searchElement.value}
        <i class="fa-solid fa-location-dot"></i>
  `;

  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`;

  console.log(time);

  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ce01c314fa9446cab0c101255240603&q=${searchElement.value}`,
    { mode: "cors" }
  );

  const searchData = await response.json();
  console.log(searchData);
  var weatherCondition = searchData.current.condition.text;
  var weatherIcon = searchData.current.condition.icon;
  var currentTempC = searchData.current.temp_c;
  var currentTempF = searchData.current.temp_f;
  var currentWindSpeed = searchData.current.wind_kph;
  var windDirection = searchData.current.wind_dir;
  var cityName = searchData.location.region;
  var updateTime = searchData.current.last_updated;

  dateDisplay.innerHTML = `
        <div class="date">${formattedDate}</div>
        <div class="line"></div>
        <div class="time">${time}</div>
  `;
  weatherDisplay.innerHTML = `
        <h2>${weatherCondition}</h2>
        <div class="line"></div>
  `;

  cityDisplay.innerHTML = `
        <h2>${cityName}</h2> (${searchElement.value})
        ${updateTime}
  `;

  temperatureDisplay.innerHTML = `${currentTempC}ºC`;

  windDisplay.innerHTML = `
    <i class="fa-solid fa-wind"></i> ${windDirection} | ${currentWindSpeed} km/h
  `;

  // forecasts
  var morningWeather =
    searchData.forecast.forecastday[0].hour[7].condition.text;
  var morningIcon = searchData.forecast.forecastday[0].hour[7].condition.icon;

  var noonWeather = searchData.forecast.forecastday[0].hour[12].condition.text;
  var noonIcon = searchData.forecast.forecastday[0].hour[12].condition.icon;

  var eveningWeather =
    searchData.forecast.forecastday[0].hour[17].condition.text;
  var eveningIcon = searchData.forecast.forecastday[0].hour[17].condition.icon;

  var nightWeather = searchData.forecast.forecastday[0].hour[22].condition.text;
  var nightIcon = searchData.forecast.forecastday[0].hour[22].condition.icon;

  const morningSVG = document.querySelector(".morning-icon");
  const noonSVG = document.querySelector(".noon-icon");
  const eveningSVG = document.querySelector(".evening-icon");
  const nightSVG = document.querySelector(".night-icon");
  const morningForecast = document.querySelector(`[time="morning"]`);
  const noonForecast = document.querySelector(`[time="noon"]`);
  const eveningForecast = document.querySelector(`[time="evening"]`);
  const nightForecast = document.querySelector('[time="night"]');

  morningSVG.src = morningIcon;
  noonSVG.src = noonIcon;
  eveningSVG.src = eveningIcon;
  nightSVG.src = nightIcon;

  morningForecast.innerHTML = `
  <div class="top">Morning, 7:00 am</div>
  <div class="bottom">${morningWeather}</div>
  `;
  noonForecast.innerHTML = `
  <div class="top">Noon, 12:00pm</div>
  <div class="bottom">${noonWeather}</div>
  `;
  eveningForecast.innerHTML = `
  <div class="top">Evening, 9:00pm</div>
  <div class="bottom">${eveningWeather}</div>
  `;
  nightForecast.innerHTML = `
  <div class="top">Night, 10:00pm</div>
  <div class="bottom">${nightWeather}</div>
  `;

  if (
    weatherCondition === "Partly cloudy" ||
    weatherCondition === "Partly Cloudy" ||
    weatherCondition === "Overcast"
  ) {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(https://cdn.pixabay.com/photo/2023/05/30/15/53/clouds-8029036_1280.jpg);
    `;
  } else if (weatherCondition === "Clear") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(https://cdn.pixabay.com/photo/2016/01/02/00/42/cloud-1117279_1280.jpg);
    `;
  } else if (weatherCondition === "Sunny") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    `;
  } else if (
    weatherCondition === "Patchy rain" ||
    weatherCondition === "Patchy rain nearby"
  ) {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(https://cdn.pixabay.com/photo/2017/08/06/09/22/rain-2590618_1280.jpg);
    `;
  } else if (weatherCondition === "Mist" || weatherCondition === "Fog") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(https://cdn.pixabay.com/photo/2017/11/11/19/36/foggy-2940170_1280.jpg);
    `;
  } else if (
    weatherCondition === "Light rain" ||
    weatherCondition === "Light drizzle"
  ) {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(https://cdn.pixabay.com/photo/2017/08/06/09/22/rain-2590618_1280.jpg);
    `;
  } else {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(https://cdn.pixabay.com/photo/2015/09/05/20/07/cabin-924958_1280.jpg);
    `;
  }

  if (currentTempC <= "3") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(https://cdn.pixabay.com/photo/2024/02/24/10/31/norway-8593725_1280.jpg);
    `;
  }

  document.getElementById("input").value = "";
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") getWeatherData();
});

document.getElementById("search").addEventListener("click", () => {
  getWeatherData();
});
