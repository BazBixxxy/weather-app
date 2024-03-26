import { add, format } from "date-fns";

const dropShow = document.querySelector(".nav-chevron");
const dropdown = document.querySelector(".dropdown");
const closeDropDown = document.querySelector(".chev");

async function getPhoneWeatherData() {
  const dateDisplay = document.querySelector(".date-phone-display");
  const weatherDisplay = document.querySelector(".weather-phone-display");
  const cityDisplay = document.querySelector(".city-phone-display");
  const temperatureDisplay = document.getElementById("temp-phone-display");
  const windDisplay = document.querySelector(".wind-display");
  const bodyElement = document.querySelector("body");
  const weather = document.getElementById("weather");

  const searchElement = document.getElementById("phone-input");

  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM do, yyyy");

  document.querySelector("nav > .right").innerHTML = `
        ${searchElement.value}
        <i class="fa-solid fa-location-dot"></i>
  `;

  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`;

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

  const morningSVG = document.querySelector(".Morning-icon");
  const noonSVG = document.querySelector(".Noon-icon");
  const eveningSVG = document.querySelector(".Evening-icon");
  const nightSVG = document.querySelector(".night-icon");
  const morningForecast = document.querySelector(`[time="Morning"]`);
  const noonForecast = document.querySelector(`[time="Noon"]`);
  const eveningForecast = document.querySelector(`[time="Evening"]`);
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
    url(../src/images/sunny-phone.jpg);
    `;
  } else if (
    weatherCondition === "Patchy rain" ||
    weatherCondition === "Patchy rain nearby"
  ) {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/rainy-phone.jpg);
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
    url(../src/images/background-phone.jpg);
    `;
  }

  if (currentTempC < "-5") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/freezing-phone.jpg);
    `;
  } else if (currentTempC < "5") {
    bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/cool-phone.jpg);
    `;
  }

  bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/cloudy.jpg);
    `;
}

dropShow.addEventListener("click", () => {
  dropdown.classList.add("show");
  document.querySelector("nav").style = "display: none;";
});

closeDropDown.addEventListener("click", () => {
  dropdown.classList.remove("show");
  document.querySelector("nav").style = "display: flex;";
});

document.getElementById("phone-search").addEventListener("click", () => {
  getPhoneWeatherData();
  dropdown.classList.remove("show");
  document.querySelector("nav").style = "display: flex;";
});

const bodyElement = document.querySelector("body");

if (bodyElement.style.backgroundImage === "") {
  bodyElement.style = `
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../src/images/cloudy.jpg);
    `;
}

var smallScreen = window.matchMedia("(max-width: 900px)");

smallScreen.addEventListener("change", () => {
  document.querySelector("nav").style = "display: none;";
  document.querySelector(".dropdown").style = "display: none;";
  document.querySelector(".phone-section").style = "display: none;";
});

if (!smallScreen) {
  document.querySelector("nav").style = "display: none;";
  document.querySelector(".dropdown").style = "display: none;";
  document.querySelector(".phone-section").style = "display: none;";
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getPhoneWeatherData();
    dropdown.classList.remove("show");
    document.querySelector("nav").style = "display: flex;";
  }
});
