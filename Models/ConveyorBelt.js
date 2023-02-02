import Package, { PackageRotation, PackageType } from "./Package.js";

export default class ConveyorBelt {
    constructor(id, width, conveyorController) {
        this.id = id;
        this.conveyorController = conveyorController;
        this.packages = [];
        this.width = width;
        this.height = 200;
        this.belt = document.createElement("div");
        this.belt.style.width = width + "px";
        this.belt.style.height = this.height + "px";
        this.belt.style.marginTop = 50 + "px";
        this.belt.style.position = "relative";
        this.belt.style.backgroundImage = "url('Resources/conveyor.png')";
        this.belt.style.backgroundSize = "45% 100%";

        this.belt.addEventListener("dragenter", (e) => {
            e.preventDefault();
        });

        this.belt.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        this.belt.addEventListener("dragleave", (e) => {
            e.preventDefault();
        });

        this.belt.addEventListener("drop", (e) => {
            e.preventDefault();
        });

        setInterval(() => this.movePackages(), 10);
        setInterval(() => this.generatePackage(), 5000);
    }

    addPackage(pack) {
        if(this.packages.includes(pack) === false) {
            this.packages.push(pack);
        }
    }

    generatePackage() {
        if (!this.conveyorController.isActive())
            return;

        let type = PackageType[Object.keys(PackageType)[Math.floor(Math.random() * Object.keys(PackageType).length)]];
        let rotation = PackageRotation[Object.keys(PackageRotation)[Math.floor(Math.random() * Object.keys(PackageRotation).length)]];
        let flipped = Math.random() >= 0.5;
        let randomGuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let pack = new Package(randomGuid, type, rotation, flipped, 0, Math.random() * 100, this.belt);

        this.addPackage(pack);
    }

    movePackages() {
        if (!this.conveyorController.isActive())
            return;

        for (let i = 0; i < this.packages.length; i++) {
            const pack = this.packages[i];
            let left = pack.container.style.left;
            left = left.substring(0, left.length - 2);
            left++;
            if(left < this.width - 35) {
                pack.container.style.left = left + "px";
            } else {
                const container = pack.container;
                const loc = container.getBoundingClientRect();
                this.belt.removeChild(pack.container);

                this.conveyorController.addPackageToQueue(pack, loc);
                this.packages.splice(i, 1);
            }
        }
    }

    removePackage(id) {
        for (let i = 0; i < this.packages.length; i++) {
            if(this.packages[i].id === id) {
                this.packages[i].destroy();
                this.packages.splice(i, 1);
                return true;
            }
        }

        return false;
    }
}