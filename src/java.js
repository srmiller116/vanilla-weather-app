function citySearch(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let cityUpdate = document.querySelector("h1");
  cityUpdate.innerHTML = `Results for ${inputCity.value}`;
  let apiKey = "3f6be1c407b0d9d1933561808db358ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&appid=${apiKey}&units=metric`;
  let displayCurrent = document.querySelector("h1");
  displayCurrent.innerHTML = `Results for lat = ${myLatitude} long = ${myLongitude}`;

  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let temperatureRound = Math.round(response.data.main.temp);
  let temperatureResponse = document.querySelector("#temperature");
  temperatureResponse.innerHTML = `${temperatureRound}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed}`;
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

let displayCurrentTime = document.querySelector("h2");
displayCurrentTime.innerHTML = `${day} ${hour}:${minutes}`;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
