function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
        <div class="weather-forecast-date">
        ${formatDay(forecastDay.dt)}
        </div>
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt=" " class="pics" />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">
            <strong> ${Math.round(forecastDay.temp.max)}° </strong></span>
            <span class="weather-forecast-temperature-min">
            ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#maximum").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minimum").innerHTML = Math.round(
    response.data.main.temp_min
  );

  fahrenheitTemperature = response.data.main.temp;
  fahrenheitMaximumTemperature = response.data.main.temp_max;
  fahrenheitMinimumTemperature = response.data.main.temp_min;

  getForecast(response.data.coord);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);
}

function searchCity(city) {
  let apiKey = `a7aa8cc77c1f3d73c2473ca3fc6238a3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "a7aa8cc77c1f3d73c2473ca3fc6238a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  document.querySelector("#maximum").innerHTML = Math.round(
    fahrenheitMaximumTemperature
  );

  document.querySelector("#minimum").innerHTML = Math.round(
    fahrenheitMinimumTemperature
  );
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let celsiusMaximumTemperature = ((fahrenheitMaximumTemperature - 32) * 5) / 9;
  document.querySelector("#maximum").innerHTML = Math.round(
    celsiusMaximumTemperature
  );

  let celsiusMinimumTemperature = ((fahrenheitMinimumTemperature - 32) * 5) / 9;
  document.querySelector("#minimum").innerHTML = Math.round(
    celsiusMinimumTemperature
  );
}

let dayAndTime = document.querySelector("#date");
let date = new Date();
dayAndTime.innerHTML = formatDate(date);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Toronto");

let fahrenheitTemperature = null;
let fahrenheitMaximumTemperature = null;
let fahrenheitMinimumTemperature = null;
