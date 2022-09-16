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
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = dayAndTime(response.data.dt * 1000);
  fullDateElement.innerHTML = date(new Date());
}
let apiKey = "6585e4dd6be7801dafc43890d5cfc86f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=New York&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayWeatherInfo);
