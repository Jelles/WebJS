export default class TruckStorage {
    constructor(container, x, y) {
        this.x = x;
        this.y = y;
        this.filled = false;
        this.view = document.createElement("div");
        this.view.style.width = 35 + "px";
        this.view.style.height = 35 + "px";
        this.view.style.position = "relative";
        this.view.style.backgroundImage = "url('Resources/packet.png')";
        this.view.style.opacity = 0.5;
        this.view.style.backgroundSize = "100% 100%";

        // add x and y inside the view
        let xText = document.createElement("p");
        xText.innerHTML = "x:" + x;
        xText.style.position = "absolute";
        xText.style.color = "white";
        xText.style.fontSize = "10px";

        let yText = document.createElement("p");
        yText.innerHTML = "y: " + y;
        yText.style.position = "absolute";
        yText.style.top = 15 + "px";
        yText.style.color = "white";
        yText.style.fontSize = "10px";


        this.view.addEventListener("dragstart", (e) => {
            e.preventDefault();
        });

        this.view.addEventListener("dragenter", (e) => {
            e.preventDefault();
            this.view.style.backgroundColor = "blue";
            this.view.style.backgroundImage = "none";
        });

        this.view.addEventListener("dragover", (e) => {
            e.preventDefault();
            this.view.style.backgroundColor = "blue";
            this.view.style.backgroundImage = "none";
        });

        this.view.addEventListener("dragleave", (e) => {
            e.preventDefault();
            this.view.style.backgroundColor = "none";
            this.view.style.backgroundImage = "url('Resources/packet.png')";
        });

        this.view.appendChild(xText);
        this.view.appendChild(yText);

        container.appendChild(this.view);
    }

    fill() {
        this.filled = true;
        this.view.style.opacity = 1;
    }

    isFilled() {
        return this.filled;
    }

    unFill() {
        this.filled = false;
        this.view.style.opacity = 0.5;
    }
}