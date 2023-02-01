import Truck, { TruckType } from "../Models/Truck.js";

export default class TruckController {
	constructor(active) {
		this.truckIndex = 0;
		this.trucks = [];
		this.active = active;
		this.truckContainer = document.getElementById('truckContainer');
		this.myContainer = document.createElement('div');
		this.truckContainer.appendChild(this.myContainer);
		this.setActive(active);
	}

	addPackageToTruck(pack, weatherController) {
		for (let i = 0; i < this.trucks.length; i++) {
			const truck = this.trucks[i];
			if (!weatherController.canDrive(truck.truckType))
				continue;
			// check truck active
			if(!truck.isActive())
				continue;

			if(truck.addPackage(pack)) {
				return true
			}
		}

		return false;
	}

	addTruck(width, length, interval, type,  mainController) {
		let truck = new Truck(this.truckIndex, length, width, interval, type, mainController);
		this.truckIndex++;
		this.trucks.push(truck);
		this.myContainer.appendChild(truck.truckContainer);
	}

	setActive(active) {
		this.active = active;
		this.myContainer.style.display = active ? "block" : "none";
	}

	isActive() {
		return this.active;
	}
}