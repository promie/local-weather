//TEST API

//https://fcc-weather-api.glitch.me/api/current?lat=-33.8998891&lon=151.1714736


$(document).ready(function(){

    const api = 'https://fcc-weather-api.glitch.me/api/current?';
    let lat, lon;
    
    //Get current geo-location
    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition(position =>{
            lat = 'lat=' + position.coords.latitude;
            lon = 'lon=' + position.coords.longitude;
            getAPIInfo(lat,lon);
        });
    }else{
        console.log('Geolocation is not supported by this browser');
    }


    //get API info
    const getAPIInfo = (lat, lon)=>{

        const urlString = `${api}${lat}&${lon}`;

        $.ajax({
            url: urlString,
            success: result=>{

                weatherInfo(`${result.main.temp}°C`, 
                result.weather[0].main, 
                result.weather[0].description, 
                result.name);
            }
        });
    }

    const weatherInfo = (temp, main, description, cityName) =>{

        $('#weather').html(temp);
        $('#main').html(main);
        $('#description').html(description);
        $('#city').html(cityName);
    }

});

const toFahrenheit = c => (c * 1.8) + 32;
const toCelsius = f => (f - 32)/1.8;















