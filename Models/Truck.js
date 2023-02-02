import TruckBack from "./TruckBack.js";
import { WeatherInfo } from "../Controllers/WeatherController.js";

export const TruckType  = {
    COLD_TRANSPORT  : 'Koud Transport',
    FRAGILE_TRANSPORT     : 'Breekbaar Transport',
    GENERAL_TRANSPORT : 'Algemeen Transport',
    PALLETS : 'Pallets',
    FAST_COURIER : 'Snelkoerier',
};

export const TruckTypes  = [
	'Koud Transport',
	'Breekbaar Transport',
	'Algemeen Transport',
	'Pallets',
	'Snelkoerier',
];

export default class Truck {
	constructor(id, length, height, interval, truckType, mainController) {
		this.packages = [];
		this.active = true;
		this.height = height;
		this.length = length;
		this.interval = interval;
		this.truckType = truckType;

		this.truckContainer = document.createElement("div");
		this.truckContainer.classList.add("row");
		this.truckContainer.classList.add("justify-content-end");

		this.truckBack = new TruckBack(this.truckContainer, length, height, interval, truckType, mainController);

		this.truckFront = document.createElement("div");
		this.truckFront.style.width = "100%";
		this.truckFront.style.height = height + "px";
		this.truckFront.style.marginTop = 50 + "px";
		this.truckFront.style.position = "relative";
		this.truckFront.style.backgroundImage = "url('Resources/front.png')";
		this.truckFront.style.backgroundSize = "100% 100%";
		this.truckFront.classList.add("col-2");

		this.truckContainer.appendChild(this.truckFront);
		this.setActive(true);
	}

	/*
	Als het regent of sneeuwt rijd de Breekbaar Transport niet.
	Als het boven de 35 graden is rijd de Koud transport niet.
	Bij harde wind rijdt de palletvrachtwagen niet. Pakketten voor deze vrachtwagens worden dan op een speciale plek opgeslagen.
 	*/

	addPackage(pack) {
		let result = this.truckBack.addPackages(pack.type, pack.rotation, pack.flipped);
		if(!result) {
			this.setActive(false);
			this.truckBack.clearPackages();
			// run task later
			setTimeout(() => {
				this.setActive(true);
			}, this.interval * 1000);
		}

		return result;
	}

	setActive(active) {
		this.active = active;
		this.truckContainer.style.display = active ? "" : "none";
	}

	isActive() {
		return this.active;
	}
}