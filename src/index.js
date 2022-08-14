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

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitHandler);
function submitHandler(e) {
  e.preventDefault();
  let cityInputElement = document.querySelector("#search-input-text");
  searchCity(cityInputElement.value);
}
function searchCity(city) {
  let apikey = "4d5e328b4891754448ad2069cf8198c2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(url).then(showTemp);
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
  h1.innerHTML = response.data.name;
  temp.innerHTML = temprature;
  humiduty.innerHTML = `Humidity:${response.data.main.humidity}%`;
  wind.innerHTML = `Wind:${windSpeed}km/h`;
  weatherShape.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  console.log(response.data);
}
// function getTempData() {
//   navigator.geolocation.getCurrentPosition(showLocation);
// }
// let locationButton = document.querySelector("#location");
// locationButton.addEventListener("click", getTempData);

// function showLocation(position) {
//   let apikey = "4d5e328b4891754448ad2069cf8198c2";
//   console.log(position);

//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
//   axios.get(url).then(showTemp);
// }
