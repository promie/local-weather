
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
                weatherInfo(result);
                showElements();
            }
        });
    }

    const weatherInfo = (result) =>{

        let units = 'C';
        let fahrenUnit;
        let percentage = '%';
        let kmPerHour = 'km/h'
        const celsiusUnit = Math.round(result.main.temp);
        
        $('#city').html(capitalize(result.name));
        $('#dateTime').html(capitalize(dateInfo()));
        $('#weather').html(`${celsiusUnit}°${units}`);
        $('#main').html(capitalize(result.weather[0].main));
        $('#humidity').html('Humidity');
        $('#humidityValue').html(`${result.main.humidity}${percentage}`);
        $('#windSpeed').html('Wind Speed');
        $('#windSpeedValue').html(`${result.wind.speed} ${kmPerHour}`);
        $('#temperatureUnit').html('Fahrenheit');
        $('#temperatureUnitValue').html(toFahrenheit(`${result.main.temp}`) + `°F`);

        weatherIcon(capitalize(result.weather[0].main));
        $('#button').on('click', function(){
            if(units === 'C'){
                units = 'F';
                fahrenUnit = toFahrenheit(`${result.main.temp}`);
                $('#weather').html(toFahrenheit(`${result.main.temp}`) + `°${units}`);
                $('#temperatureUnit').html('Celsius');
                $('#temperatureUnitValue').html(toCelsius(`${fahrenUnit}`) + `°C`);      
            }else if(units === 'F'){
                units = 'C';
                fahrenUnit = toFahrenheit(`${result.main.temp}`);

                $('#weather').html(toCelsius(`${fahrenUnit}`) + `°${units}`);
                $('#temperatureUnit').html('Fahrenheit');
                $('#temperatureUnitValue').html(toFahrenheit(`${result.main.temp}`) + `°F`);      
                
            }
        });
    }



    const capitalize = (str) =>{
        return str.toUpperCase();
    }

    
    const getDayOfWeek = (dayNum) =>{
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'];

        return day[dayNum];
    }

    const getMonthName = (monthNum) =>{
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October','November', 'December'];
    
        return month[monthNum];
    }

    const dateInfo = () =>{

        let day, date, month, year;
        
        const newDate = new Date();
        day = getDayOfWeek(newDate.getDay());
        date = newDate.getDate();
        month = getMonthName(newDate.getMonth());
        year = newDate.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
    }

    const toFahrenheit = c => Math.round((c * 1.8) + 32);
    const toCelsius = f => Math.round((f - 32)/1.8);
        
});

const weatherIcon = (description)=>{
    
    description = description.toLowerCase();
    let weatherDescription = document.getElementById('weatherIcon');
    let cloudyDescription = document.getElementById('main');

    switch(description){
        case 'drizzle':
            weatherDescription.src = "img/drizzle.png";
            document.body.style.background ='#E5E4E2 no-repeat right top';
            break;
        case 'clouds':
            cloudyDescription.innerHTML = 'CLOUDY';
            weatherDescription.src = "img/cloudy.png";
            document.body.style.background = "#52D017 no-repeat right top";
            break;
        case 'rain':
            weatherDescription.src = "img/rain.png";
            document.body.style.background = "#C8BDAF no-repeat right top";
            break;
        case 'snow':
            weatherDescription.src = "img/snow.png";
            document.body.style.background = "#FCDFFF no-repeat right top";
            break;
        case 'clear':
            weatherDescription.src = "img/clear.png";
            document.body.style.background = "#CCFFFF no-repeat right top"
            break;
        case 'thunderstorm':
            weatherDescription.src = "img/thunderstorm.png";
            document.body.style.background = "#F9966B no-repeat right top";
            break;
    }

}

const showElements = () =>{
    const author = document.getElementById('author');
    author.style.display = 'block';
    const githubLogo = document.getElementById('github');
    githubLogo.style.display = 'block';
    const humidity = document.getElementById('humidity-icon');
    humidity.style.display = 'block';
    humidity.style.margin = '0 auto';
    const windSpeed = document.getElementById('windSpeed-icon');
    windSpeed.style.display = 'block';
    windSpeed.style.margin = '0 auto';
    const temperatureUnit = document.getElementById('button');
    temperatureUnit.style.display = 'block';
    temperatureUnit.style.margin = '0 auto';
}
















