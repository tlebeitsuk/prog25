const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact?"

function getLocation() {
    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position.coords.latitude, position.coords.longitude)
            getWeather(position.coords.latitude, position.coords.longitude)
        },
        error => {
            console.log("Could not get location:", error.message)
        }
    )
}

async function getWeather(lat, lon) {
    const response = await fetch(`${API_URL}lat=${lat}&lon=${lon}`)
    const data = await response.json()

    const current = data.properties.timeseries[0].data

    const weather = {
        time: data.properties.timeseries[0].time,
        temperature: Math.round(current.instant.details.air_temperature),
        humidity: current.instant.details.relative_humidity,
        wind: current.instant.details.wind_speed,
        condition: current.next_1_hours.summary.symbol_code,
        precipitation_amount: current.next_1_hours.details.precipitation_amount
    }

    const forecast = data.properties.timeseries.slice(1, 7).map(item => ({
        time: item.time,
        temperature: Math.round(item.data.instant.details.air_temperature),
        condition: item.data.next_1_hours.summary.symbol_code,
    }))

    document.querySelector("#temperature").textContent = weather.temperature
}

getLocation()