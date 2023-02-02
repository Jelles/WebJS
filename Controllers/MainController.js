import TruckController from "./TruckController.js";
import TruckModal from "../Models/TruckModal.js";
import ConveyorController from "./ConveyorController.js";
import WeatherController from "./WeatherController.js";
import WeatherSelect from "../Models/WeatherSelect.js";

export default class MainController {
    constructor() {
        this.truckModal = new TruckModal(this);
        this.weatherSelect = new WeatherSelect(this);

        document.getElementById("switchTabs").addEventListener('click', () => this.switchTabs());
        document.getElementById('addConveyorBtn').addEventListener('click', () => this.addConveyor());
        document.getElementById('weatherLocationSelect').addEventListener('change', (event) => {
            const { value } = event.target;
            console.log(value);
        });

        setInterval(() => {
            this.fromQueueToTruck();
        }, 1000);

        this.weatherControllerTab1 = new WeatherController(true);
        this.weatherControllerTab2 = new WeatherController(false);

        this.truckControllerTab1 = new TruckController(true);
        this.truckControllerTab2 = new TruckController(false);

        this.conveyorControllerTab1 = new ConveyorController(true, this);
        this.conveyorControllerTab2 = new ConveyorController(false, this);
    }

    getActiveTruckController() {
        return this.truckControllerTab1.isActive() ? this.truckControllerTab1 : this.truckControllerTab2;
    }

    getActiveWeatherController() {
        return this.weatherControllerTab1.isActive() ? this.weatherControllerTab1 : this.weatherControllerTab2;
    }

    getActiveConveyorController() {
        return this.conveyorControllerTab1.isActive() ? this.conveyorControllerTab1 : this.conveyorControllerTab2;
    }

    switchTabs() {
        this.truckControllerTab1.setActive(!this.truckControllerTab1.isActive());
        this.truckControllerTab2.setActive(!this.truckControllerTab2.isActive());

        this.conveyorControllerTab1.setActive(!this.conveyorControllerTab1.isActive());
        this.conveyorControllerTab2.setActive(!this.conveyorControllerTab2.isActive());

        this.weatherControllerTab1.setActive(!this.weatherControllerTab1.isActive());
        this.weatherControllerTab2.setActive(!this.weatherControllerTab2.isActive());
    }

    setWeather(location) {
        this.getActiveWeatherController().setWeather(location);
    }

    addTruck(width, length, interval, type) {
        this.getActiveTruckController().addTruck(width, length, interval, type, this);
    }

    addPackageToQueue(pack, loc) {
        this.getActiveTruckController().addPackageToTruck(pack, loc);
    }

    fromQueueToTruck() {
        this.getActiveTruckController().fromQueueToTruck(this.getActiveWeatherController());
    }

    addConveyor() {
        this.getActiveConveyorController().addConveyor();
    }

    removePackage(id) {
        this.getActiveConveyorController().removePackage(id);
    }
}