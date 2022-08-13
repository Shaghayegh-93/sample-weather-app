let now = new Date();
let hour = now.getHours();
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

let time = document.querySelector("#current-time");
time.innerHTML = `${day} ${hour}:${minutes} `;
let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);
function showCity(e) {
  e.preventDefault();
  let formInput = document.querySelector("#search-input-text");
  let h1 = document.querySelector("h1");
  h1.innerHTML = formInput.value;
  let apikey = "4d5e328b4891754448ad2069cf8198c2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&appid=${apikey}&units=metric`;
  axios.get(url).then(showTemp);
}
function showTemp(response) {
  let temprature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherShape = document.querySelector("#weatherShape");
  let wind = document.querySelector("#wind");
  let humiduty = document.querySelector("#humidity");
  let temp = document.querySelector("#temp");
  temp.innerHTML = temprature;
  humiduty.innerHTML = `Humidity:${response.data.main.humidity}%`;
  wind.innerHTML = `Wind:${windSpeed}km/h`;
  weatherShape.innerHTML = response.data.weather[0].main;
}
function getTempData() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getTempData);

function showLocation(position) {
  let apikey = "4d5e328b4891754448ad2069cf8198c2";
  console.log(position);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
  axios.get(url).then(showTemp);
}
