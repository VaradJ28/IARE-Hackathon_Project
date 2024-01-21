const showFinal = document.getElementById('weather-body');
const getBody = document.querySelector('body');



function giveData(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } 
      
      else {
       alert("Your location isn't available to us and we cannot show weather data")
      }

      function showPosition(positions) {
        var lat=positions.coords.latitude;
        var long=positions.coords.longitude;

        //console.log(lat,long);
        arrangeApi(lat,long);
      }

      
}

function arrangeApi(latitude,longitude) {
  const apiKey="9cde11b82b4efe17f8560ddb3a935587";
  const api="https://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&appid=apiKey";
  const firstHalfApi ="https://api.openweathermap.org/data/2.5/weather?lat=";
  const secondHalfApi="&lon=";
  const thirdHalfApi="&appid=";
  const fullAPI= firstHalfApi+latitude+ secondHalfApi+longitude+thirdHalfApi+apiKey;
 //console.log(fullAPI);
  retData(fullAPI);
}

async function retData(fullAPi){
 const apiUrlData = await fetch(fullAPi);
 const DataApi = await apiUrlData.json();
 //console.log(DataApi);


 showData(DataApi);
}

function showData(DataWeather){
 console.log(DataWeather);
 const {main,wind,sys} = DataWeather;

 console.log(main);
 console.log(main.feels_like);
 var finalTemp = parseInt(main.feels_like-273.15);
 console.log(main.humidity);
 console.log(DataWeather.name);
 console.log(DataWeather.weather[0].main);
 console.log(DataWeather.weather[0].description);
 console.log(wind);
 console.log(wind.speed);
 console.log(sys.sunrise);
 console.log(sys.sunset);
 console.log(DataWeather.weather[0].icon);
 var imageicon= DataWeather.weather[0].icon;
 var sunriseTime= sunrise(sys.sunrise);
 var sunsetTime= sunset(sys.sunset);

console.log(sunriseTime);
console.log(sunsetTime);


showFinal.innerHTML=`
<div class="city-name">
                <h3 class="text-white">${DataWeather.name}</h3>
            </div>
            <div class="weather-icon">
                <img src="http://openweathermap.org/img/wn/${imageicon}@2x.png" alt="">
            </div>
            
            <div class="weather-main">
                <h3 class="text-white">${DataWeather.weather[0].main}</h3>
            </div>
            <div class="weather-data">
                <h3 class="text-white">${finalTemp}<sup>&#176</sup>C</h3>
            </div>
            <div class="weather-description">
                <h3 class="text-white">${DataWeather.weather[0].description}</h3>
            </div>
            <div class="weather-humidity">
                <h5 class="text-white">Humidity - ${main.humidity}</h5>
            </div>
            <div class="weather-wind">
                <h5 class="text-white">Wind-Speed - ${wind.speed}</h5>
            </div>
            <div class="weather-sunrise">
                <h5 class="text-white">SunRise - ${sunriseTime}</h3>
            </div>
            <div class="weather-sunset">
                <h5 class="text-white">SunSet - ${sunsetTime}</h3>
            </div>

`;

/*if(imageicon=='01d' || imageicon=='01n'){
  console.log("clear");
  getBody.style.backgroundImage="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1523913950023-c47b5ae5b164?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80');";
}
else if(imageicon=='02d' || imageicon=='02n'){
  console.log("few clouds");
  getBody.style.backgroundImage="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1511747779856-fd751a79aa22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80');";
}
else if(imageicon=='03d' || imageicon=='03n'){
  console.log("scattered");
  getBody.style.backgroundImage="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1561583534-09e822ba83ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1012&q=80');";
}
else if(imageicon=='04d' || imageicon=='04n'){
  console.log("broken");
  getBody.style.backgroundImage="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1614368558175-ad4a95a6d8d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');";
}
else if(imageicon=='09d' || imageicon=='09n'){
  console.log("shower Rain");
  getBody.style.backgroundImage="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1494007485290-ce668e189d92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80');";
}
else if(imageicon=='10d' || imageicon=='10n'){
  console.log("few clouds");
  getBody.style.backgroundImage+="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80');";
}
else if(imageicon=='11d' || imageicon=='11n'){
  console.log("few clouds");
  getBody.style.backgroundImage="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1597907412477-dad8c83d3e86?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80');";
}
else if(imageicon=='13d' || imageicon=='13n'){
  console.log("few clouds");
  getBody.style.backgroundImage="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80');";
}
else if(imageicon=='50d' || imageicon=='50n'){
  console.log("few clouds");
  getBody.style.backgroundImage="linear-gradient( rgba(0,0,0,0.3),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1495294926616-f282c4219dfc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=782&q=80');";
}*/
}

function sunrise(datae){
  var date = new Date(datae * 1000);
  var timestr = date.toLocaleTimeString();
  
  //console.log(timestr);
  return timestr;
}

function sunset(dat){
  var date = new Date(dat * 1000);
  var timestr = date.toLocaleTimeString();
  
  //console.log(timestr);
  return timestr;
}