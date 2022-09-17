function date(currentDate) {
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let date = currentDate.getDate();
  return `${year}/${month}/${date}`;
}
function dayAndTime(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day}  ${hours}:${minutes}`;
}
function displayWeatherInfo(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#weather-description");
  let dateElement = document.querySelector("#day-and-time");
  let fullDateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = dayAndTime(response.data.dt * 1000);
  fullDateElement.innerHTML = date(new Date());
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "6585e4dd6be7801dafc43890d5cfc86f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherInfo);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-input");
  inputElement.value = inputElement.value.trim();
  if (inputElement.value) {
    search(inputElement.value);
  } else {
    alert("Please enter a city.");
  }
}
function searchLocation(position) {
  let latitude = position.coords.lat;
  let longitude = position.coords.lon;
  let apiKey = "6585e4dd6be7801dafc43890d5cfc86f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherInfo);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
}
search("Tehran");
let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);
let currentBtnElement = document.querySelector("#current-weather-btn");
currentBtnElement.addEventListener("click", currentLocation);
let celsiusTemperature = null;
let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", convertToFahrenheit);
let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", convertToCelsius);
