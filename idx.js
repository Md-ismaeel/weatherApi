const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImage = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

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
      locationNotFound.style.display = "flex";
      weatherBody.style.display = "none";
      return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed}Km/h`;

    if (data.weather[0].main == "Clouds") {
      weatherImage.src = "./assets/cloud.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImage.src = "./assets/rain.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImage.src = "./assets/clear.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImage.src = "./assets/snow.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImage.src = "./assets/rain.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImage.src = "./assets/mist.png";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  let city = inputBox.value;
  renderWeather(city);
});
