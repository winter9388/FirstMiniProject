
// api key : 2dba1ac4d3e9e6a26302588b9946e97c


// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const inputElement = document.querySelector(".input");
const informaionElement = document.querySelector(".appExplain");
const questionMark = document.querySelector(".fa-question-circle");
const weatherConElement = document.querySelector(".weather-container");

// App data
const weather = {}

weather.temperature = {
  unit : "celsius"
}

// App CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "96131e222460da17cb059675a018fde9";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>Browser doesn't Support 
  Geolocation</P>`
}

// SET USER'S POSITION
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  getWeather(latitude, longitude);

  inputElement.addEventListener("keydown",function(e){
    if (e.key === "Enter"){
      getWeather2(inputElement.value);
      weatherConElement.classList.add("searchEffect")
      inputElement.value = "";
      setTimeout(function(){weatherConElement.classList.remove("searchEffect")},1000);
    }
  })
}

// SHOW ERROR IF THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  //let api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

  fetch(api)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

function getWeather2(cityName){
  //let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  let api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

  fetch(api)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICK ON THE TEMPERATURE ELEMENT
tempElement.addEventListener('click', function(){
  if(weather.temperature.value === undefined) return

  if(weather.temperature.unit === "celsius"){
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  }else{
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});

// SHOW HELP INPORMATION
// questionMark.addEventListener("click",function(e){
//   if (!informaionElement.classList.contains("question")){
//     informaionElement.classList.add("question")
//     informaionElement.classList.remove("questionRemove")
//   }else{
//     console.log("has")
//     informaionElement.classList.add("questionRemove")
//     informaionElement.classList.remove("question")
//   }
// })

questionMark.addEventListener("mouseover",function(e){
  if (!informaionElement.classList.contains("question")){
    informaionElement.classList.add("question")
    informaionElement.classList.remove("questionRemove")
  }
})

questionMark.addEventListener("mouseout",function(e){
  
    informaionElement.classList.add("questionRemove")
    informaionElement.classList.remove("question")
 
})

