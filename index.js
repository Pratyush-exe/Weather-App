let link = "http://api.openweathermap.org/data/2.5/weather?";
let api = "88f08e581b02b92556fe1a1213bc18e4";

let genDecp = document.getElementById('gen-decp');
let city = document.getElementById('city');
let temp = document.getElementById('temp');
let feelsLike = document.getElementById('feels-like');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let status = document.getElementById('status');

document.getElementById('search-icon1').addEventListener('click', function() {
    document.getElementById('city-search2').value = "";
    getData(0, 0, document.getElementById('city-search1').value, false);
})

document.getElementById('search-icon2').addEventListener('click', function() {
    document.getElementById('city-search1').value = "";
    let response = document.getElementById('city-search2').value.split(",");
    getData(parseInt(response[0]), parseInt(response[1]), "", true);
})

async function getData(lat, long, city, isCoor) {
    let response;

    if(isCoor){
        response = await fetch(link + "lat=" + lat.toString() + "&" + "lon=" + long.toString() + "&" + "appid=" + api);
    }
    else {
        response = await fetch( link + "q=" + city + "&" + "appid=" + api);
    }

    if(response.status == 404 || response.status == 400) {
        status.textContent = "Location not found in Database."
        status.style.color = '#890000';
    }
    else {
        status.textContent = "Location found in DataBase."
        status.style.color = '#024f02';

        let Data = await response.json();
        display(Data);
    }
}

var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};
  
function success(pos) {
    var crd = pos.coords;
    let lat = crd.latitude;
    let long = crd.longitude;
    getData(lat, long, "", true);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function display(Data) {
    city.textContent = Data.name + ", " + Data.sys.country;
    genDecp.textContent = Data.weather[0].main + ", " + Data.weather[0].description;
    temp.textContent = Math.round(Data.main.temp).toString() + "°";
    feelsLike.textContent = "Feels Like: " + Math.round(Data.main.feels_like).toString() + "°";
    wind.textContent = "Wind: " + Data.wind.speed.toString() +" m/s";
    humidity.textContent = "Humidity: " + Data.main.humidity.toString() + "%";
}