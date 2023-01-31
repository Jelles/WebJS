import TruckController from "./TruckController.js";
import TruckModal from "../Models/TruckModal.js";
import ConveyorController from "./ConveyorController.js";

export default class MainController {
    constructor() {
        this.truckModal = new TruckModal(this);
        document.getElementById("switchTabs").addEventListener('click', () => this.switchTabs());
        document.getElementById('addConveyorBtn').addEventListener('click', () => this.addConveyor());

        this.truckControllerTab1 = new TruckController(true);
        this.truckControllerTab2 = new TruckController(false);

        this.conveyorControllerTab1 = new ConveyorController(true, this);
        this.conveyorControllerTab2 = new ConveyorController(false, this);
    }

    getActiveTruckController() {
        return this.truckControllerTab1.isActive() ? this.truckControllerTab1 : this.truckControllerTab2;
    }

    getActiveConveyorController() {
        return this.conveyorControllerTab1.isActive() ? this.conveyorControllerTab1 : this.conveyorControllerTab2;
    }

    switchTabs() {
        this.truckControllerTab1.setActive(!this.truckControllerTab1.isActive());
        this.truckControllerTab2.setActive(!this.truckControllerTab2.isActive());

        this.conveyorControllerTab1.setActive(!this.conveyorControllerTab1.isActive());
        this.conveyorControllerTab2.setActive(!this.conveyorControllerTab2.isActive());
    }

    addTruck(width, length, interval, type) {
        this.getActiveTruckController().addTruck(width, length, interval, type, this);
    }

    addPackageToTruck(pack) {
        return this.getActiveTruckController().addPackageToTruck(pack);
    }

    addConveyor() {
        this.getActiveConveyorController().addConveyor();
    }
}