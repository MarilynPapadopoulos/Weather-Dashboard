var cityInputEl = document.querySelector("#usercity");
var userFormEl = document.querySelector("#userform");



var formSubmitHandler = function(event) {
    event.preventDefault();
    //get city from input element
    var usercity = cityInputEl.value.trim();

    console.log("usercity", usercity);
    getUserWeather(usercity);
};

var getUserWeather = function(userCity) {
    //format the user's city api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity +"&appid=25c5a8418c884750202fef3ff9571c32&units=metric";
    
    //make request to url
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log("data", data);
            });  
        }
    })
};

var displayWeather = function() {
    var titleEl = document.querySelector("#cityname");
    titleEl.textContent = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity +"&appid=25c5a8418c884750202fef3ff9571c32&units=metric";
}
 
userFormEl.addEventListener("submit", formSubmitHandler);

