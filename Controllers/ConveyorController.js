import ConveyorBelt from "../Models/ConveyorBelt.js";

export default class ConveyorController {
    constructor(active, mainController) {
        this.conveyorIndex = 0;
        this.conveyors = [];
        this.active = active;
        this.mainController = mainController;
        this.conveyorContainer = document.getElementById('conveyorContainer');
        this.myContainer = document.createElement('div');

        let conveyor = new ConveyorBelt(0,800, this.mainController, this);
        this.conveyorIndex++;

        this.conveyors.push(conveyor);

        this.myContainer.appendChild(conveyor.belt);
        this.conveyorContainer.appendChild(this.myContainer);
        this.setActive(active);
    }

    addConveyor() {
        if(this.conveyors.length < 5) {
            // TODO Create conveyor belt and add to DOM
            let width = document.getElementById('conveyorWidth').value;
            if (width < 100) {
                alert("Min width is 100");
                return;
            }

            this.conveyors.push(new ConveyorBelt(this.conveyorIndex, width, this.mainController, this));
            this.myContainer.appendChild(this.conveyors[this.conveyorIndex].belt);
            this.conveyorIndex++;
            return;
        }

        alert("Max 5 conveyors");
    }

    setActive(active) {
        this.active = active;
        this.myContainer.style.display = active ? "block" : "none";
    }

    isActive() {
        return this.active;
    }
}