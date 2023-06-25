var searchButton = document.querySelector('#search-btn');
var cityInput = document.querySelector('#city-search');

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

getCoordApi(51.5073219, -0.1276474);

// This works, now I need to find a way to get the lat and lon from array to plug into getCoordApi
function getCityApi(cityName){
    var citySearchURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid=24551ac99b969231c8ae35b5ac552a6c";
    fetch(citySearchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

// function prevents default and takes input to plug into getCityApi function
var formSubmitHandler = function (event){
    event.preventDefault();
    var citySearched = cityInput.value.trim();
    if (citySearched){
        getCityApi(citySearched);
        cityInput.value = '';
    // returns alert if nothing is searched
    } else {
        alert('Please enter a city name.')
    }
}


searchButton.addEventListener('click', formSubmitHandler);