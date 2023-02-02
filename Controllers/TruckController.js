import Truck from "../Models/Truck.js";

export default class TruckController {
	constructor(active) {
		this.truckIndex = 0;
		this.trucks = [];
		this.packageQueue = [];
		this.active = active;
		this.truckContainer = document.getElementById('truckContainer');
		this.packageQueueContainer = document.createElement('div');
		document.getElementById("packagesContainer").appendChild(this.packageQueueContainer);
		this.myContainer = document.createElement('div');
		this.truckContainer.appendChild(this.myContainer);
		this.setActive(active);
	}

	addPackageToTruck(pack, loc) {
		this.packageQueueContainer.appendChild(pack.container);
		pack.container.style.left = loc.left + "px";
		pack.container.style.top = loc.top + "px";
		this.packageQueue.push(pack);
	}

	fromQueueToTruck(weatherController) {
		if(this.packageQueue.length <= 0)
			return false;

		for (let i = 0; i < this.trucks.length; i++) {
			const truck = this.trucks[i];
			if (!weatherController.canDrive(truck.truckType))
				continue;
			// check truck active
			if(!truck.isActive())
				continue;

			let pack = this.packageQueue.shift();
			let result = truck.addPackage(pack);


			if(result.length > 0) {
				// play animation
				let location = result[0].view.getBoundingClientRect();
				pack.movePackageOverTime(location.left, location.top).then(r => {
					pack.destroy();
					for (let i = 0; i < result.length; i++) {
						result[i].view.style.opacity = 1;
					}
				});

				return true;
			}

			this.packageQueue.unshift(pack);
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
		this.packageQueueContainer.style.display = active ? "block" : "none";
	}

	isActive() {
		return this.active;
	}
}