const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

// async function checkWeather(city) {
//   const api_key = "2ff0cb5d2a058e451e895b68782844e7";
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

//   const weather_data = await fetch(`${url}`).then((response) =>
//     response.json()
//   );

//   if (weather_data.cod === `404`) {
//     location_not_found.style.display = "flex";
//     weather_body.style.display = "none";
//     console.log("error");
//     return;
//   }

//   console.log("run");
//   location_not_found.style.display = "none";
//   weather_body.style.display = "flex";
//

// searchBtn.addEventListener("click", () => {
//   checkWeather(inputBox.value);
// });

async function renderWeather(city) {
  const apiKey = "2ff0cb5d2a058e451e895b68782844e7";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // fetch(apiUrl)
  //   .then((response) => {
  //     // if (!response.ok) {
  //     //   throw new Error(`Network response was not ok: ${response.status}`);
  //     // }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);

  const response = await fetch(apiUrl);
  const data = await response.json();

  try {
    if (data.cod === "404") {
      location_not_found.style.display = "flex";
      weather_body.style.display = "none";
      return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind_speed.textContent = `${data.wind.speed}Km/h`;

    if (data.weather[0].main == "Clouds") {
      weather_img.src = "./assets/cloud.png";
    } else if (data.weather[0].main == "Rain") {
      weather_img.src = "./assets/rain.png";
    } else if (data.weather[0].main == "Clear") {
      weather_img.src = "./assets/clear.png";
    } else if (data.weather[0].main == "Snow") {
      weather_img.src = "./assets/snow.png";
    } else if (data.weather[0].main == "Drizzle") {
      weather_img.src = "./assets/rain.png";
    } else if (data.weather[0].main == "Mist") {
      weather_img.src = "./assets/mist.png";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  let city = inputBox.value;
  renderWeather(city);
});
