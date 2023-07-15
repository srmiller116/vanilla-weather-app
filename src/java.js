function citySearch(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let cityUpdate = document.querySelector("h1");
  cityUpdate.innerHTML = `Results for ${inputCity.value}`;
  let apiKey = "3f6be1c407b0d9d1933561808db358ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(function (response) {
    showTemperature(response);
    formatDay(response.data.dt);
  });
}

function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  console.log(position);
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  console.log(`${myLatitude}`);
  console.log(`${myLongitude}`);
  let apiKey = "3f6be1c407b0d9d1933561808db358ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&appid=${apiKey}&units=imperial`;
  let displayCurrent = document.querySelector("h1");
  displayCurrent.innerHTML = `Results for lat = ${myLatitude} long = ${myLongitude}`;

  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let temperatureRound = Math.round(response.data.main.temp);
  let temperatureResponse = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  celciusTemperature = Math.round(response.data.main.temp);
  temperatureResponse.innerHTML = `${celciusTemperature}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "3f6be1c407b0d9d1933561808db358ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(function (response) {
    displayForecast(response.data);
  });
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", citySearch);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", searchCurrentLocation);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let time = now.getTime();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let displayCurrentTime = document.querySelector("h5");
displayCurrentTime.innerHTML = `${day} ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let fday = date.getDay();
  let fdays = ["Sun", "Mon", "Tue", "wed", "Thur", "Fri", "Sat"];

  return fdays[fday];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
            
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="icon"
                width="36"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
         `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
