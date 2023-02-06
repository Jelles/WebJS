import {TruckTypes} from "./Truck.js";

export default class TruckModal {
    constructor(mainController) {
        this.mainController = mainController;
        this.step = 0;
        this.setupCreateTruck();

        this.changeStep(1);
    }

    addTruckModal() {
        document.getElementById('truckModal').style.display = "block";
        this.step = 0;
        this.toFirstStep();
    }

    closeTruckModal() {
        document.getElementById('truckModal').style.display = "none";
    }

    setupCreateTruck() {
        document.getElementById('addTruckBtn').addEventListener('click', () => this.addTruckModal());
        document.getElementById('closeTruckModal').addEventListener('click', () => this.closeTruckModal())
        document.getElementById('stepButton').addEventListener('click', () => this.nextStep());
        document.getElementById('prevButton').addEventListener('click', () => this.previousStep());

        for (let i = 0; i < TruckTypes.length; i++) {
            const truckType = TruckTypes[i];
            const option = document.createElement("option");
            option.value = truckType;
            option.innerHTML = truckType;
            document.getElementById("truckTypeInput").appendChild(option);
        }
    }

    createTruck() {
        let width = document.getElementById('truckWidthInput').value;
        let length = document.getElementById('truckLengthInput').value;
        let interval = document.getElementById('truckIntervalInput').value;
        let type = document.getElementById('truckTypeInput').value;

        if (width === "" || length === "" || interval === "" || type === "") {
            alert("Please fill in all the fields");
            return;
        }

        if (width < 2 || width > 8) {
            alert("Please stay within the width range (2-8)")
            return;
        }

        if (length < 3 || length > 25) {
            alert("Please stay within the length range (3-25)")
            return;
        }

        if (interval < 0 || interval > 60) {
            alert("Please stay within the interval range (0-60)")
            return;
        }

        this.mainController.addTruck(width * 36, length * 36, interval, type);
        this.closeTruckModal();
    }

    nextStep() {
        if(this.step === 1) {
            this.toSecondStep();
        } else if(this.step === 2) {
            this.toEndStep();
        } else if(this.step === 3) {
            this.createTruck();
        }
    }

    previousStep() {
        if(this.step === 2) {
            this.toFirstStep();
        } else if(this.step === 3) {
            this.toSecondStep();
        }
    }

    toFirstStep() {
        this.changeStep(1);
    }

    toSecondStep() {
        this.changeStep(2);
    }

    toEndStep() {
        this.changeStep(3);
    }

    changeStep(step) {
        const elements = {
            1: ["truckLength", "truckWidth"],
            2: ["truckInterval"],
            3: ["truckType"],
        };

        Object.entries(elements).forEach(([stepNum, elementIds]) => {
            elementIds.forEach((elementId) => {
                if (stepNum == step) {
                    document.getElementById(elementId).style.display = "block";
                } else {
                    document.getElementById(elementId).style.display = "none";
                }
            });
        });

        document.getElementById("stepButton").innerText = step == 3 ? "Create" : "Next";
        document.getElementById("prevButton").style.display = step == 1 ? "none" : "block";

        this.step = step;
    }
}