function showCurrentTime(now) {
  //this function shows the current date and time
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusrday",
    "Friday",
    "Saturday",
  ];

  let weekDay = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let today = document.querySelector("#current-time"); //these two lines shows the time that the forcast was updated
  today.innerHTML = `${weekDay} ${hour}:${minute}`;
}

function showCityAndTemp(response) {
  //this functions access the data of the chosen city and shows the name of the city and its properties
  document.querySelector("#city").innerHTML = response.data.name;
  //console.log(response.data.weather[0].icon);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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

  showCurrentTime(new Date(response.data.dt * 1000));
}

function accessCity(event) {
  //this function shows the city name of the city that was entered
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityAndTemp);
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
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 17;
}

function showFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(17 * 1.8 + 32);
}

let form = document.querySelector("form"); //these two lines access the city entered
form.addEventListener("submit", accessCity);

let currentLocation = document.querySelector("#current-button"); //these two lines listens to current button
currentLocation.addEventListener("click", accessCurrentLocation);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", showFarenheit);
