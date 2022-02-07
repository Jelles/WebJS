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
	constructor(length, width, interval, truckType) {
		this.length = length;
		this.width = width;
		this.interval = interval;
		this.truckType = truckType;
	}
}