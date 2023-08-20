document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('.weather-app');
    const temp = document.querySelector('.temp');
    const dateOutput = document.querySelector('.date');
    const timeOutput = document.querySelector('.time');
    const conditionOutput = document.querySelector('.condition');
    const nameOutput = document.querySelector('.name');
    const cloudOutput = document.querySelector('.cloud');
    const humidityOutput = document.querySelector('.humidity');
    const windOutput = document.querySelector('.wind');
    const icon = document.querySelector('.icon');
    const form = document.querySelector('.locationInput');
    const search = document.querySelector('.search');
    const btn = document.querySelector('.submit');
    const cities = document.querySelectorAll('.city');

    // Default city when the page loads
    let cityInput = "Da Nang";

    // Add click event to each city in the panel
    cities.forEach((city) => {
        city.addEventListener('click', (e) => {
            // Change from default city to the clicked one
            cityInput = e.target.innerHTML;
            featchWeatherData();
            app.style.opacity = "0"; 
        });
    });
//  Add submit event to the form 
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    if(search.value.length == 0){
        alert('Please type in a city name');
    }
    else {
        cityInput = search.value;
        featchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tueday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

// Call API from WeatherAPI
function featchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=9c204a98ac634c1c9aa121751232008&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML = data.current.temp_c +"&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        /* Get the date and time from the city and extract
        
        the day, month,, year and time into individual variables */
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);
        
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
        timeOutput.innerHTML = time;

        // Add the name of the city into the page
        nameOutput.innerHTML = data.location.name;

        const iconID = data.current.condition.icon.substr
        ("//cdn.weatherapi.com/weather/64x64/".length);
    
        icon.src ="./assets/icons/" + iconID;
        // Add the weather details to the page
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";

        // Set default time of day
        let timeOfDay = "day";
        const code = data.current.condition.code;

        // Change to night if its night time in the city
        if(!data.current.is_day) {
            timeOfDay = "night";
        }
        // Set the bg image to clear if the weather is clear
        if (code == 1000) {
            app.style.backgroundImage =`url(./assets/images/${timeOfDay}/clear.jpg)`
            btn.style.background = "#e5ba92";
            if(timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
        }
        else if (
            code === 1003 ||
            code === 1006 ||
            code === 1009 ||
            code === 1030 ||
            code === 1069 ||
            code === 1087 ||
            code === 1135 ||
            code === 1273 ||
            code === 1276 ||
            code === 1279 ||
            code === 1282 
        ) {
            app.style.backgroundImage =
            `url(./assets/images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#none";
            if(timeOfDay == "night") {
                btn.style.background = "#none";            
            }
        }   else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1083 ||
            code == 1086 ||
            code == 1089 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252 

        ) {
            app.style.backgroundImage =
            `url(./assets/images/${timeOfDay}/rainy.jpg)`
            btn.style.background = "#none";            
            if(timeOfDay == "night") {
                btn.style.background = "#none";            
            }
        } else {
            app.style.backgroundImage =
            `url(./assets/images/${timeOfDay}/snow.jpg)`
            btn.style.background = "#none";            
            if(timeOfDay == "night") {
                btn.style.background = "#none";            
            }
        }
        app.style.opacity ="1";
    })
    .catch(() => {
        alert('City not found, please try again');
        app.style.opacity ="1";
    });
}
featchWeatherData();
app.style.opacity ="1";
});
