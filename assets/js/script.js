var searchButton = document.querySelector('#search-btn');
var cityInput = document.querySelector('#city-search');
var oldSearches = document.querySelector('#old');
var currCity = document.querySelector('#current-city');

// API runs lat and lon inputs and outputs weather data
function getCoordApi(lat, lon) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=24551ac99b969231c8ae35b5ac552a6c&units=imperial";
    fetch(weatherURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var day = new Date();
            document.querySelector("#current-date").textContent = day.toLocaleDateString();
            currCity.textContent = data.city.name;
            document.querySelector('#current-icon').setAttribute("src", "https://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+".png");
            document.querySelector('#temp').textContent = "Temperature: " + data.list[0].main.temp + " °F";
            document.querySelector('#wind').textContent = "Wind: " + data.list[0].wind.speed + " MPH";
            document.querySelector('#humidity').textContent = "Humidity: " + data.list[0].main.humidity + " %";
            // current weather index [0]

            let cardIndex = 0;
            const card = document.querySelectorAll(".forecast-card-header")
            console.log(card);
            // for loop grabs data with noon times and pulls certain data elements to display on cards
            for (let i = 0; i < data.list.length; i++) {
                if(data.list[i].dt_txt.includes("12:00:00")){
                    console.log(data.list[i]);
                    card[cardIndex].textContent = new Date(data.list[i].dt * 1000).toLocaleDateString()
                    document.querySelectorAll('.card-icon')[cardIndex].setAttribute("src", "https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png");
                    document.querySelectorAll('.card-temp')[cardIndex].textContent = "Temp: " + data.list[i].main.temp + " °F";
                    document.querySelectorAll('.card-wind')[cardIndex].textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                    document.querySelectorAll('.card-humidity')[cardIndex].textContent = "Humidity: " + data.list[i].main.humidity + " %";

                    // this has to be last in loop
                    cardIndex++;
                }

                
                
            }
        })
    
}

// This API function extracts lat and lon data from API to plug into getCoordApi function
function getCityApi(cityName){
    var citySearchURL = "https://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid=24551ac99b969231c8ae35b5ac552a6c";
    fetch(citySearchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            // calls other API function and plugs in lat and lon variables
            getCoordApi(lat, lon);
        })
}

// function prevents default and takes text input to plug into getCityApi function
var formSubmitHandler = function (event){
    const cityarr = JSON.parse(localStorage.getItem("city")) || [];
    console.log(cityarr);
    event.preventDefault();
    var citySearched = cityInput.value.trim();
    // conditional checks for valid input and clears out input box
    if (citySearched){
        getCityApi(citySearched);
        cityInput.value = '';
        // checks local storage for previous searches, if none, new array made.
        cityarr.push(citySearched)
        localStorage.setItem("city", JSON.stringify(cityarr));
        console.log(cityarr)
        displayOldSearches();
    // returns alert if nothing is searched
    } else {
        alert('Please enter a city name.')
    }
}

function displayOldSearches(){
    const cityarr = JSON.parse(localStorage.getItem("city")) || [];
    console.log(cityarr);
    oldSearches.textContent = ""
    // for loop creates list of old entries form local storage
    for (let i = 0; i < cityarr.length; i++) {
        const element = cityarr[i];
        let listOld = document.createElement("li")
        listOld.setAttribute("class", "old-list")
        let buttonOld = document.createElement("button")
        buttonOld.setAttribute("class","btn btn-secondary")
        buttonOld.textContent = element;
        buttonOld.onclick = function (event) {
            console.log(event.target.textContent);
            getCityApi(event.target.textContent);
        }
        listOld.append(buttonOld) 
        oldSearches.appendChild(listOld)
    }
}

function displayCurrentDay(){
    
}

displayOldSearches();
searchButton.addEventListener('click', formSubmitHandler);

