import CurrentWeatherRequest from "../Request/CurrentWeatherRequest.js";
import {TruckType} from "../Models/Truck.js";

export default class WeatherController {
    constructor(active) {
        this.weatherInfo = new WeatherInfo(-1, 0, 0);
        this.active = active;
        this.currentWeather = "Amsterdam";
        this.setActive(active);
    }

    getWeather(location) {
        let callback = (weather) => {
            this.weatherInfo = new WeatherInfo(weather.current_weather.weathercode, weather.current_weather.temperature, weather.current_weather.windspeed);
            if(this.active) {
                document.getElementById("weatherIcon").src = this.getWeatherIcon(this.weatherInfo.weatherCode);
                document.getElementById("weatherTemp").innerText = this.weatherInfo.temperature;
                document.getElementById("weatherSpeed").innerText = this.weatherInfo.windSpeed;
            }
        }

        new CurrentWeatherRequest(location, callback);
    }



    getWeatherIcon() {
        return `Resources/weather-icons/${getWeatherCode(this.weatherInfo.weatherCode)}.png`;
    }

    setActive(active) {
        this.active = active;
        if (active) {
            document.getElementById("weatherLocationSelect").value = this.currentWeather;
            this.getWeather(this.currentWeather);
        }
    }

    setWeather(location) {
        this.currentWeather = location;
        this.getWeather(location);
    }

    isActive() {
        return this.active;
    }

    /*
    Als het regent of sneeuwt rijd de Breekbaar Transport niet.
    Als het boven de 35 graden is rijd de Koud transport niet.
    Bij harde wind rijdt de palletvrachtwagen niet.
     */
    canDrive(truckType) {
        switch (truckType) {
            case TruckType.FRAGILE_TRANSPORT:
                if(WeatherCode.drizzle.includes(this.weatherInfo.weatherCode) || WeatherCode.rain.includes(this.weatherInfo.weatherCode) || WeatherCode.snow.includes(this.weatherInfo.weatherCode))
                    return false;
                break;
            case TruckType.COLD_TRANSPORT:
                if(this.weatherInfo.temperature > 25)
                    return false;
                break;
            case TruckType.PALLETS:
                if(this.weatherInfo.windSpeed > 15)
                    return false;
                break;
        }

        return true;
    }
}

export const WeatherCode = {
    unknown: [-1],
    clear: [0, 1],
    partly_cloudy: [2],
    overcast: [3],
    fog: [45, 48],
    drizzle: [51, 53, 55, 56, 57],
    rain: [61, 63, 65, 66, 67, 80, 81, 82],
    snow: [71, 73, 75, 77, 85, 86],
    thunder: [95, 96, 99]
}

function getWeatherCode(weatherCode) {
    for (let key in WeatherCode) {
        if (WeatherCode[key].includes(weatherCode)) {
            return key;
        }
    }
}

export class WeatherInfo {
    constructor(weatherCode, temperature, windSpeed) {
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.weatherCode = weatherCode;
    }
}