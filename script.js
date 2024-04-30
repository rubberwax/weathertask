const weatherUrl = 'https://api.yr.no/weatherapi/locationforecast/2.0/compact?lat=55.7558&lon=37.6176';
const weatherContainer = document.getElementById('weather-data');


fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        const forecast = data.properties.timeseries;
        const weatherData = forecast.map(entry => {
            const time = new Date(entry.time);
            const temperature = entry.data.instant.details.air_temperature;
            return { time, temperature };
        });
        displayWeather(weatherData);
    })
    .catch(error => console.error('Error fetching weather data:', error));

function displayWeather(weatherData) {
    const weatherContainer = document.getElementById('weather-data');
    weatherData.forEach(({ time, temperature }) => {
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedTime = time.toLocaleDateString('en-US', dateOptions);
        const temperatureString = `${formattedTime}: ${temperature}°C<br>`;
        weatherContainer.innerHTML += temperatureString;
    });
}
