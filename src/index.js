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
function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="row text-center">`;
  let forecast = response.data.daily;
  console.log(forecast);
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
             <div class="col">
               <ul class="weather-forecast-5days">
                 <li>${formatDayForecast(forecastDay.dt)}</li>
                 <li><img src= http://openweathermap.org/img/wn/${
                   forecastDay.weather[0].icon
                 }@2x.png alt=${
          forecastDay.weather[0].description
        } class="forecast-icons"/></li>
                 <li>
                <span class="weather-forecast-temprature-max">${Math.round(
                  forecastDay.temp.max
                )}° </span>  <span class="weather-forecast-temprature-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
                 </li>
                 
               </ul>
             </div>
           
 `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coord) {
  apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeatherInfo(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#weather-description");
  let dateElement = document.querySelector("#day-and-time");
  let fullDateElement = document.querySelector("#date");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = dayAndTime(response.data.dt * 1000);
  fullDateElement.innerHTML = date(new Date());
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6585e4dd6be7801dafc43890d5cfc86f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherInfo);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

search("Tehran");
let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);
let currentBtnElement = document.querySelector("#current-weather-btn");
currentBtnElement.addEventListener("click", currentLocation);
