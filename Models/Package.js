export default class Package {
    constructor(id, type, rotation, flipped, x, y, container) {
        this.id = id;
        this.type = type;
        this.flipped = flipped;
        this.rotation = rotation;
        this.boxes = [];
        this.container = document.createElement("div");
        this.container.draggable = true;
        this.container.style.position = "absolute";
        this.container.style.width = "auto";
        this.container.style.height = "auto";
        this.container.style.top = y + "px";
        this.container.style.left = x + "px";
        this.container.style.zIndex = 1;

        this.container.addEventListener("contextmenu", (event) => { event.preventDefault(); this.onRightClick(); });
        this.container.addEventListener("click", (event) => { event.preventDefault(); this.onLeftClick(); });
        this.container.addEventListener("dragstart", (event) => {
            const JSONData = JSON.stringify(this);
            event.dataTransfer.setData("text", JSONData);
        });

        container.appendChild(this.container);

        this.draw();
    }

    movePackageOverTime(x, y) {
        x = parseInt(x);
        y = parseInt(y);

        let timer;
        let pack = this;

        return new Promise(resolve => timer = setInterval(function () {
            // get current position of the package
            let currentX = parseInt(pack.container.style.left);
            let currentY = parseInt(pack.container.style.top);

            // calculate the step size needed to move the package


            let stepX = Math.ceil((x - currentX) / 10);
            let stepY = Math.ceil((y - currentY) / 10);

            // move the package step by step
            pack.container.style.left = (currentX + stepX) + 'px';
            pack.container.style.top = (currentY + stepY) + 'px';

            console.log("Target location: " + x + ", " + y);
            console.log("Current location: " + currentX + ", " + currentY);

            // if the package has stopped moving (step size is 0), clear the timer
            if (stepX === 0 && stepY === 0) {
                console.log("Package has stopped moving");
                clearInterval(timer);
                resolve();
            }

            // if the package has reached the target location, clear the timer
            if (currentX === x && currentY === y) {
                console.log("Package has reached target location");
                clearInterval(timer);
                resolve();
            }
        }));

    }

    draw() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        this.boxes = [];

        const type = this.type;
        for (let i = 0; i < type.length; i++) {
            let x;
            let y;


            switch (this.rotation) {
                case PackageRotation.Zero:
                    x = this.flipped ?  - type[i][0] :  + type[i][0];
                    y =  + type[i][1];
                    break;
                case PackageRotation.Ninety:
                    x =  + type[i][1];
                    y = this.flipped ?  + type[i][0] :  - type[i][0];
                    break;
            }


            const box = new Box(x * 35, y * 35);
            this.boxes.push(box);
            this.container.appendChild(box.view);
        }
    }

    onLeftClick() {
        this.flipped = !this.flipped;
        this.draw();
    }

    onRightClick() {
        let rot;

        switch (this.rotation) {
            case PackageRotation.Zero:
                rot = PackageRotation.Ninety;
                break;
            case PackageRotation.Ninety:
                rot = PackageRotation.Zero;
                break;

        }

        this.rotation = rot;
        this.draw();
    }

    destroy() {
        this.container.remove();
    }
}

class Box {
    constructor(x, y) {
        this.view = document.createElement("div");
        this.view.style.width = "35px";
        this.view.style.height = "35px";
        this.view.style.position = "absolute";
        this.view.style.backgroundImage = "url('Resources/packet.png')";
        this.view.style.backgroundSize = "100% 100%";
        this.view.style.top = y + "px";
        this.view.style.left = x + "px";
        this.view.style.zIndex = 2;
    }
}

export const PackageType = {
    Straight: [[0, 0], [0, 1], [0, 2], [0, 3]],
    Square: [[0, 0], [0, 1], [1, 1], [1, 0]],
    T: [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1]],
    Skew: [[0, 0], [0, 1], [1, 1], [1, 2]],
    L: [[0, 0], [0, 1], [0, 2], [1, 2]],
}

export const PackageRotation = {
    Zero: 0,
    Ninety: 90,
}