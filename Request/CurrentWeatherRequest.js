import InvalidLocationError from "../Errors/InvalidLocationError.js";
import ResponseError from "../Errors/ResponseError.js";

export default class CurrentWeatherRequest {
    constructor(weatherLocation, callback) {
        if (!Object.keys(WeatherLocation).includes(weatherLocation)) {
            throw new InvalidLocationError("The given location is not supported.", weatherLocation);
        }

        weatherLocation = WeatherLocation[weatherLocation];

        this.lat = weatherLocation.lat;
        this.long = weatherLocation.long;

        this.callback = callback;
        this.getWeather();
    }

    getWeather() {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.long}&current_weather=true`
        ).catch(err => {
            throw new ResponseError("The weather API returned an error.", err);
        }).then(response => {
            if(response.status !== 200)
                throw new ResponseError("The weather API returned an error.", response, response.status);

            return response.json();
        }).then(data => this.callback(data));
    }
}


// https://www.rainviewer.com/weather-radar-map-live.html
export const WeatherLocation = {
    "Amsterdam": {
        "lat": 52.370216,
        "long": 4.895168
    },
    "New York": {
        "lat": 40.712776,
        "long": -74.005974
    },
    "London": {
        "lat": 51.507351,
        "long": -0.127758
    },
    "Berlin": {
        "lat": 52.520008,
        "long": 13.404954
    },
    "Paris": {
        "lat": 48.856614,
        "long": 2.352222
    },
    "Tokyo": {
        "lat": 35.689487,
        "long": 139.691706
    },
    "Sydney": {
        "lat": -33.868820,
        "long": 151.209296
    },
    "Moscow": {
        "lat": 55.755826,
        "long": 37.617300
    },
    "Beijing": {
        "lat": 39.904200,
        "long": 116.407396
    },
    "Kobenhavn": {
        "lat": 55.676097,
        "long": 12.568337
    },
    "Uppsala": {
        "lat": 59.858563,
        "long": 17.638926
    }
};