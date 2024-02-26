const apiKey = '4ee3340db7d534587c2be5d3e40fb0dd';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


let searchBtn = document.querySelector('.search');
let search = document.querySelector('.text');
let countryName = document.querySelector('.name');
let tempElement = document.querySelector('.temp');
let desElement = document.querySelector('.description');
let comment = document.querySelector('.comment');
let weatherIcon = document.querySelector('.icon');
let backgroundPix = document.querySelector('.body');
let errorMsg = document.querySelector('.error');
let countryTime = document.querySelector('time');


searchBtn.addEventListener('click', (e) =>{
e.preventDefault();
    let location = search.value;
    if(location == ''){
        errorMsg.textContent ='please enter a city name';
        setTimeout(() => {
            errorMsg.textContent ='';
        }, 2000); 
    }else{
        fetchWeather(location)
    }
});

function convertCountryTime(timestamp,timezone){
    const convertTimezone = timezone/3600;
    const date = new Date(timestamp * 1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >=0? "-":"+"}${Math.abs(convertTimezone)}`,
        hour12:true,
    }
    return date.toLocaleString("en-US", options)
};

function convertCountryCode(country){
    let regionName = new Intl.DisplayNames(["en"],{type:"region"});
    return regionName.of(country)
};

function fetchWeather(location){

    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
            
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            countryName.textContent = `${data.name},${convertCountryCode(data.sys.country)}`;
            countryTime.textContent = data.dt, data.timezone;
            tempElement.textContent = `${Math.round(data.main.temp)}°C`;
            desElement.textContent = data.weather[0].description;
            comment.textContent = data.wind.speed + 'km/h';

            if(data.weather[0].main == 'Clouds'){
                weatherIcon.src = 'images/cloudysky.png';
                backgroundPix.style.backgroundImage ='url(images/tom-barrett-hgGplX3PFBg-unsplash.jpg)';
            }
            else if(data.weather[0].main == 'Clear'){
                weatherIcon.src = 'images/sun.png';
                backgroundPix.style.backgroundImage ='url(images/usgs-Yhx6-WibC3I-unsplash.jpg)';
            }
            else if(data.weather[0].main == 'Rain'){
                weatherIcon.src = 'images/rain.png';
            }
            else if(data.weather[0].main == 'Drizzle'){
                weatherIcon.src = 'images/cloudy.png';
            }
            else if(data.weather[0].main == 'Mist'){
                weatherIcon.src = 'images/mist.png';
            }
            else if(data.weather[0].main == 'Snow'){
                weatherIcon.src = 'images/snow.png';
            }
            else if(data.weather[0].main == 'Smoke'){
                weatherIcon.src = 'images/smoky.png';
                backgroundPix.style.backgroundImage ='url(images/tom-barrett-hgGplX3PFBg-unsplash.jpg)';
            }
        })
        .catch(error =>{
            console.log('error fetching weather data', error);
        });
}

    // if(search.value == ''){
    //     alert('please enter a city name');
    // }else{
    //     countryName.innerText = search.value;
    // }

