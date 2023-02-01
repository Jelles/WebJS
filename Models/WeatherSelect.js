import {WeatherLocation} from "../Request/CurrentWeatherRequest.js";

export default class WeatherSelect {
    constructor(mainController) {
        this.mainController = mainController;
        this.setupWeatherSelect();
    }

    setupWeatherSelect() {
        this.weatherLocationSelect = document.getElementById('weatherLocationSelect');

        for (let key in WeatherLocation) {
            const option = document.createElement("option");
            option.value = key;
            option.innerHTML = key;
            this.weatherLocationSelect.appendChild(option);
        }

        this.weatherLocationSelect.addEventListener('change', (event) => {
            const { value } = event.target;
            this.mainController.setWeather(value);
        });
    }
}