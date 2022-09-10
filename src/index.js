function dayAndTime(currentTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${days[currentTime.getDay()]}   ,  ${hour}:${minute}`;
}

function date(currentDate) {
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let date = currentDate.getDate();
  return `${year}/${month}/${date}`;
}
function recieveApi(city) {
  let apiKey = "6585e4dd6be7801dafc43890d5cfc86f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}
function serachCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchInput.value = searchInput.value.trim();
  if (searchInput.value) {
    let city = searchInput.value;
    recieveApi(city);
  } else {
    alert("Please enter a city");
  }
}
function showPosition(position) {
  let latitude = position.coords.lat;
  let longitude = position.coords.lon;
  let apiKey = "6585e4dd6be7801dafc43890d5cfc86f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let day = document.querySelector("#day");
day.innerHTML = dayAndTime(new Date());
let fullDate = document.querySelector("#date");
fullDate.innerHTML = date(new Date());
recieveApi("Tehran");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", serachCity);
let currentWeatherBtn = document.querySelector("#current-weather-btn");
currentWeatherBtn.addEventListener("click", showCurrentWeather);
