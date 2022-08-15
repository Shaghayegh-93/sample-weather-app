function formatDate(date) {
  let now = new Date(date);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
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
  let minutes = now.getMinutes();
  if (minutes < 0) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes} `;
}

function formateDayInfo(dayTemp) {
  let data = new Date(dayTemp * 1000);
  let day = data.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitHandler);
function submitHandler(e) {
  e.preventDefault();
  let cityInputElement = document.querySelector("#search-input-text");
  searchCity(cityInputElement.value);
}
function searchCity(city) {
  let apikey = "2971ccbf2de067e77ea20c8aa6834f74";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(url).then(showTemp);
}
function getForcastDate(coordinate) {
  console.log(coordinate);
  let apikey = "2971ccbf2de067e77ea20c8aa6834f74";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apikey}&units=metric`;

  axios.get(url).then(displaydaysForcast);
}

function showTemp(response) {
  let temprature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherShape = document.querySelector("#weatherShape");
  let wind = document.querySelector("#wind");
  let humiduty = document.querySelector("#humidity");
  let temp = document.querySelector("#temp");
  let h1 = document.querySelector("h1");
  let dateElement = document.querySelector("#current-time");
  let icon = document.querySelector("#icon");
  h1.innerHTML = response.data.name;
  celsius = response.data.main.temp;
  temp.innerHTML = temprature;
  humiduty.innerHTML = `Humidity:${response.data.main.humidity}%`;
  wind.innerHTML = `Wind:${windSpeed}km/h`;
  weatherShape.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute(
    "alt",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  getForcastDate(response.data.coord);
}
function displayFarenheit(e) {
  e.preventDefault();
  let temp = document.querySelector("#temp");
  celsiusTemp.classList.remove("active");
  farenheit.classList.add("active");
  let farenheitTemp = (celsius * 9) / 5 + 32;
  console.log(celsius);
  temp.innerHTML = Math.round(farenheitTemp);
}
function displayCelsius(e) {
  e.preventDefault();
  celsiusTemp.classList.add("active");
  farenheit.classList.remove("active");
  let temp = document.querySelector("#temp");
  console.log(celsius);
  temp.innerHTML = Math.round(celsius);
}
let celsius = null;
let farenheit = document.querySelector("#fahrenheit");
farenheit.addEventListener("click", displayFarenheit);
let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", displayCelsius);

function displaydaysForcast(response) {
  let forcastDaysElement = document.querySelector("#forcastDays");
  let forcast = response.data.daily;
  console.log(response.data.daily);
  let forcastHtml = `<div class="row">`;

  forcast.forEach(function (forcastedayInfo, index) {
    if (index < 6) {
      forcastHtml =
        forcastHtml +
        `
    <div class="col-2">
    <div class="weatherForcastDate">${formateDayInfo(forcastedayInfo.dt)}</div>
    <img src=http://openweathermap.org/img/wn/${
      forcastedayInfo.weather[0].icon
    }@2x.png
    alt=""
    width="42"/>
    <div class="weatherForcastTemperture">
    <span class="weatherForcastMaxTemperture" >${Math.round(
      forcastedayInfo.temp.max
    )}° </span>
    <span class="weatherForcastMinTemperture" >${Math.round(
      forcastedayInfo.temp.min
    )}° </span>
    </div>
    </div>
    `;
    }
  });
  forcastHtml = forcastHtml + `<div/>`;
  forcastDaysElement.innerHTML = forcastHtml;
}


function getTempData() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getTempData);

function showLocation(position) {
  let apikey = "4d5e328b4891754448ad2069cf8198c2";


  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
  axios.get(url).then(showTemp);
}

searchCity("manchester");