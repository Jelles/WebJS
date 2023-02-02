import TruckStorage from "./TruckStorage.js";
import { PackageRotation } from "./Package.js";

export default class TruckBack {
    constructor(container, length, height, interval, truckType, mainController) {
        this.mainController = mainController;
        // create 2d array
        let amountHorizontal = Math.floor(length / 35);
        let amountVertical = Math.floor(height / 35);

        this.truckStorages = new Array(amountHorizontal);
        for (let i = 0; i < this.truckStorages.length; i++) {
            this.truckStorages[i] = new Array(amountVertical);
        }


        this.view = document.createElement("div");
        this.view.style.width = length + "px";
        this.view.style.height = height + "px";
        this.view.style.marginTop = 50 + "px";

        this.view.style.position = "relative";

        this.view.style.borderStyle = "solid";
        this.view.style.borderWidth = "1px";
        this.view.style.borderColor = "black";

        this.view.style.display = "flex";
        this.view.style.alignContent = "flex-start";
        this.view.style.flexWrap = "wrap";



        // fill view with TruckStorage
        // calculate how many 35x35 boxes fit in the view (length / 35) * (height / 35)
        for(let y = 0; y < amountVertical; y++) {
            for(let x = 0; x < amountHorizontal; x++) {
                // TODO Check Truck height
                let truckStorage = new TruckStorage(this.view, x, y);

                truckStorage.view.addEventListener("drop", (e) => {
                    truckStorage.view.style.backgroundColor = "none";
                    truckStorage.view.style.backgroundImage = "url('Resources/packet.png')";
                    let data = e.dataTransfer.getData("text");
                    let pack = JSON.parse(data);
                    let packageList = this.addPackage(pack.type, pack.rotation, pack.flipped, truckStorage.x, truckStorage.y);
                    if(packageList.length > 0) {
                        this.mainController.removePackage(pack.id);
                    }
                });

                this.truckStorages[x][y] = truckStorage;
            }
        }

        container.appendChild(this.view);
    }

    addPackage(type, rotation, flipped, x, y) {
        let packageList = new Array(0);

        for (let i = 0; i < type.length; i++) {
            let xOffset;
            let yOffset;


            switch (rotation) {
                case PackageRotation.Zero:
                    xOffset = flipped ?  - type[i][0] :  + type[i][0];
                    yOffset =  + type[i][1];
                    break;
                case PackageRotation.Ninety:
                    xOffset =  + type[i][1];
                    yOffset = flipped ?  + type[i][0] :  - type[i][0];
                    break;
            }


            // out of bounds
            if(x + xOffset < 0 || x + xOffset >= this.truckStorages.length) {
                return new Array(0);
            }

            if(y + yOffset < 0 || y + yOffset >= this.truckStorages[0].length) {
                packageList = new Array(0);
                return new Array(0);
            }

            // already filled
            if(this.truckStorages[x + xOffset][y + yOffset].isFilled())  {
                return new Array(0);
            }

            packageList.push(this.truckStorages[x + xOffset][y + yOffset]);
        }

        for (let i = 0; i < packageList.length; i++) {
            packageList[i].fill();
        }

        return packageList;
    }

    addPackages(type, rotation, flipped) {
        for (let i = 0; i < this.truckStorages.length; i++) {
            for (let j = 0; j < this.truckStorages[i].length; j++) {
                let packageLoc = this.addPackage(type, rotation, flipped, i, j);
                if(packageLoc.length > 0)
                    return packageLoc;
            }
        }

        return false;
    }

    clearPackages() {
        for (let i = 0; i < this.truckStorages.length; i++) {
            for (let j = 0; j < this.truckStorages[i].length; j++) {
                this.truckStorages[i][j].unFill();
            }
        }
    }
}

