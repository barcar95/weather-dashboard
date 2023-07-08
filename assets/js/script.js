var searchButton = document.querySelector('#search-btn');
var cityInput = document.querySelector('#city-search');

// API runs lat and lon inputs and outputs weather data
function getCoordApi(lat, lon) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=24551ac99b969231c8ae35b5ac552a6c&units=imperial";
    fetch(weatherURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

// This API function extracts lat and lon data from API to plug into getCoordApi function
function getCityApi(cityName){
    var citySearchURL = "https://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid=24551ac99b969231c8ae35b5ac552a6c";
    fetch(citySearchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            // calls other API function and plugs in lat and lon variables
            getCoordApi(lat, lon);
        })
}

// function prevents default and takes text input to plug into getCityApi function
var formSubmitHandler = function (event){
    event.preventDefault();
    var citySearched = cityInput.value.trim();
    // conditional checks for valid input and clears out input box
    if (citySearched){
        getCityApi(citySearched);
        cityInput.value = '';
        // checks local storage for previous searches, if none, new array made.
        let cityarr = JSON.parse(localStorage.getItem("city")) || [];
        console.log(cityarr);
        cityarr.push(citySearched)

        localStorage.setItem("city", JSON.stringify(cityarr));
        console.log(cityarr)
    // returns alert if nothing is searched
    } else {
        alert('Please enter a city name.')
    }
}


searchButton.addEventListener('click', formSubmitHandler);
