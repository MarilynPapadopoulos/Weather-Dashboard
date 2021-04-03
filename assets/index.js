var cityInputEl = document.querySelector("#usercity");
var userFormEl = document.querySelector("#userform");
var searchHistoryEl = document.querySelector("#history");

var titleEl = document.querySelector("#cityname");
var icon = document.querySelector("img");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windSpeedEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv");


var formSubmitHandler = function(event) {
    event.preventDefault();
    //get city from input element
    var usercity = cityInputEl.value.trim();

    localStorage.setItem("UserCity", "usercity");

   if (usercity) {
    var cityList = document.createElement("li");
    cityList.addClass="list-group-item"
    cityList.textContent = usercity;
   
   cityList.onclick = function() {
    var cityClicked = event.target
    localStorage.getItem("User City");
   }
   



    searchHistoryEl.appendChild(cityList); 
   
    getLatLon(usercity);
   }
};

var getLatLon = function(userCity) {
    //clear  input field
    cityInputEl.value = '';
    console.log(userCity);
    //format the user's city api url
    var apiLatLonUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity +"&appid=25c5a8418c884750202fef3ff9571c32&units=metric";
    
    //make request to url
    fetch(apiLatLonUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log("data", data);

                var longtitude = data.coord.lon;
                var lattitude = data.coord.lat;
                var cityname = data.name;
               
                getUserWeather(lattitude,longtitude, cityname);
            });  
        }
    })
};

   //function that passes the long and lat 
   var getUserWeather = function(lattitude, longtitude, cityname){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" +longtitude + "&exclude=minutely,hourly,alerts&appid=25c5a8418c884750202fef3ff9571c32&units=metric";

    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                displayWeather(data, cityname);
            });
        }
    });
}

var displayWeather = function(data, cityname) {
    console.log("displayWeather data", data);
    var iconUrl = `https://openweathermap.org/img/wn/${ data.current.weather[0].icon }.png`;

    icon.src = iconUrl;

    var currentDateStr = new Date (data.current.dt * 1000).toString();
    var currentDate = currentDateStr.slice(0,15);
   
    
    titleEl.textContent = cityname +" "+ currentDate +" ";
    
    temperatureEl.textContent = "Temperature: " + data.current.temp;
  
    humidityEl.textContent = "Humidity: " + data.current.humidity;
    windSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed;
    uvEl.textContent = "UV Index: " + data.current.uvi;

    if(data.current.uvi < 3){
        uvEl.setAttribute("class", "bg-success");
    }
    else if (data.current.uvi > 3 && data.current.uvi < 6){
        uvEl.setAttribute("class", "bg-warning");
    }
    else if (data.current.uvi > 6 && data.current.uvi < 8){
        uvEl.setAttribute("class", "bg-#fd7e14");
    }
    else{
        uvEl.setAttribute("class", "bg-danger");
    }

    document.querySelector("#fiveday").innerHTML = "";

    for(var i=0; i < 5; i++) {
        var fiveDayContainerEl = document.querySelector("#fiveday");
        var dailyForcastEl = document.createElement("div");
        dailyForcastEl.setAttribute("class","col px-1");
        var fiveDayiconEl = document.createElement("img");
        
        var ulList = document.createElement("ul");
        var dateEl = document.createElement("li");
        dateEl.setAttribute("class","bg-primary");
        var iconEl = document.createElement("li");
        iconEl.setAttribute("class","bg-primary");
        var tempEl = document.createElement("li");
        tempEl.setAttribute("class","bg-primary");
        var humidEl = document.createElement("li");
        humidEl.setAttribute("class","bg-primary");

        var dailyDateStr = new Date(data.daily[i].dt * 1000).toString();
        dateEl.textContent = dailyDateStr.slice(0,15);
        
        fiveDayiconEl.src = `https://openweathermap.org/img/wn/${ data.daily[i].weather[0].icon }.png`;
        iconEl.appendChild(fiveDayiconEl);
       
        tempEl.textContent= data.daily[i].temp.day;
        humidEl.textContent= data.daily[i].humidity;
       
        ulList.appendChild(dateEl);
        ulList.appendChild(iconEl);
        ulList.appendChild(tempEl);
        ulList.appendChild(humidEl);


        dailyForcastEl.appendChild(ulList);
        fiveDayContainerEl.appendChild(dailyForcastEl);

        
    }
  
};

 
userFormEl.addEventListener("click", formSubmitHandler);

