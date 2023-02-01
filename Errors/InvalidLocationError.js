export default class InvalidLocationError extends Error {
    constructor(message, location) {
        super(message + " " + location);
        alert(message + " " + location)
        this.name = "InvalidLocationError";
    }
}