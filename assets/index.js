var cityInputEl = document.querySelector("#usercity");
var userFormEl = document.querySelector("#userform");

var titleEl = document.querySelector("#cityname");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windSpeedEl = document.querySelector("#wind");
var uvEl=document.querySelector("#uv");



var formSubmitHandler = function(event) {
    event.preventDefault();
    //get city from input element
    var usercity = cityInputEl.value.trim();

    console.log("usercity", usercity);
    getLatLon(usercity);
};

var getLatLon = function(userCity) {
    //format the user's city api url
    var apiLatLonUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity +"&appid=25c5a8418c884750202fef3ff9571c32&units=metric";
    
    //make request to url
    fetch(apiLatLonUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log("data", data);

                var longtitude = data.coord.lon;
                var lattitude = data.coord.lat;
                console.log(longtitude);
               
                getUserWeather(lattitude,longtitude);

            });  
        }
       
    })
};

var displayTitle = function(city,date) {}

   //make a function that passes the long and lat 
   var getUserWeather = function(lattitude, longtitude){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" +longtitude + "&exclude=minutely,hourly,alerts&appid=25c5a8418c884750202fef3ff9571c32&units=metric";

    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                displayWeather(data);
                
            });
        }
        
    });
    
}
var displayWeather = function(data) {
    console.log("displayWeather data", data);
   
    titleEl.textContent = data.timezone + data.current.dt + data.current.weather.icon;

    temperatureEl.textContent = "Temperature: " + data.current.temp;
    humidityEl.textContent = "Humidity: " + data.current.humidity;
    windSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed;
    uvEl.textContent = "UV Index: " + data.current.uvi;
};


 
userFormEl.addEventListener("submit", formSubmitHandler);

