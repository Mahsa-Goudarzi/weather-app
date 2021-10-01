function showTime(timestamp) {
  //this function shows the day and time that weather data was updated
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusrday",
    "Friday",
    "Saturday",
  ];
  now = new Date(timestamp);
  let weekDay = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${weekDay} ${hour}:${minute}`;
}

function showCityAndTemp(response) {
  //this functions access the data of the chosen city and shows the name of the city and its properties
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#update-time").innerHTML = showTime(
    response.data.dt * 1000
  ); //this line shows the time that the forcast was updated
  document
    .querySelector("#icon-today")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon-today")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = celsiusTemperature;
  //add class "active" to celsius link and remove active class from fahrenheit link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  document.querySelector("#high-temp-today").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#low-temp-today").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityAndTemp);
}

function accessCity(event) {
  //this function shows the city name of the city that was entered
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCurrentLocationData(position) {
  //this function accesses data of the precise position of the user
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityAndTemp);
}

function accessCurrentLocation(event) {
  //this function access the data of the user's current place
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocationData);
}

function showCelsius(event) {
  event.preventDefault();
  //add class "active" to celsius link and remove active class from fahrenheit link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = celsiusTemperature;
}

function showFahrenheit(event) {
  event.preventDefault();
  //add class "active" to fahrenheit link and remove active class from celsius link
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature * 1.8 + 32
  );
}

let form = document.querySelector("form"); //these two lines access the city entered
form.addEventListener("submit", accessCity);

let currentLocation = document.querySelector("#current-button"); //these two lines listens to current button
currentLocation.addEventListener("click", accessCurrentLocation);

let celsiusTemperature = null; //this is a variable that will contain the current temperature in celsius

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

searchCity("Tehran");
