//===Weather API===//

let weather = {
  apiKey: "c14edbaa7e5cd83f4deac686cc6f6cef",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apiKey +
        "&units=metric"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

//===Search Bar===//

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    weather.search();
    getVideo();
    document.querySelector(".search-bar").value = "";
  }
});

//===================

//===Random Image API===//

const getVideo = function () {
  let name = document.querySelector(".search-bar").value;

  fetch("https://api.pexels.com/v1/search?query=" + name, {
    headers: {
      Authorization: "563492ad6f91700001000001f450341b30f34e6fafa7db361226676f",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data.photos[0]);
      let backgroundImage = document.getElementsByTagName("BODY")[0];

      if (data.photos[0] == undefined) {
        backgroundImage.style.backgroundImage = "url(./img/959309.png)";
      } else {
        let backgroundImageUrl = data.photos[1].src.original;
        backgroundImage.style.backgroundImage =
          "url(" + backgroundImageUrl + ")";
        backgroundImage.style.backgroundRepeat = "no-repeat";
        backgroundImage.style.backgroundSize = "cover";
        backgroundImage.style.backgroundPosition = "center";
      }
    });
};
