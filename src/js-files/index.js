import "../stylesheets/general.css";
import "../stylesheets/sidebar.css";
import "../stylesheets/styles.css";
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
    searchData.forecast.forecastday[0].hour[21].condition.text;
  var eveningIcon = searchData.forecast.forecastday[0].hour[21].condition.icon;

  const morningSVG = document.querySelector(".morning-icon");
  const noonSVG = document.querySelector(".noon-icon");
  const eveningSVG = document.querySelector(".evening-icon");
  const morningForecast = document.querySelector(`[time="morning"]`);
  const noonForecast = document.querySelector(`[time="noon"]`);
  const eveningForecast = document.querySelector(`[time="evening"]`);

  morningSVG.src = morningIcon;
  noonSVG.src = noonIcon;
  eveningSVG.src = eveningIcon;

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

  if (
    weatherCondition === "Partly cloudy" ||
    weatherCondition === "Partly Cloudy" ||
    weatherCondition === "Overcast"
  ) {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/partlycloudy.jpg);
    `;
  } else if (weatherCondition === "Clear") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/sunny.jpg);
    `;
  } else if (weatherCondition === "Sunny") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/clear2.jpg);
    `;
  } else if (
    weatherCondition === "Patchy rain" ||
    weatherCondition === "Patchy rain nearby"
  ) {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/patchyrains.jpg);
    `;
  } else if (weatherCondition === "Mist") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/misty.jpg);
    `;
  } else if (weatherCondition === "Fog") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/fog.jpg);
    `;
  } else if (
    weatherCondition === "Light rain" ||
    weatherCondition === "Light drizzle"
  ) {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/rainy2.jpg);
    `;
  } else {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/rainy2.jpg);
    `;
  }

  if (currentTempC < "-5") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/freezing.jpg);
    `;
  } else if (currentTempC < "5") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/snow.jpg);
    `;
  }
}

searchIcon.addEventListener("click", () => {
  getWeatherData();
});

document
  .querySelector(".search-area")
  .addEventListener("click", getWeatherData);

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") getWeatherData();
});

document.getElementById("search").addEventListener("click", () => {
  getWeatherData();
});
