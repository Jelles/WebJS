/**
 * @class View
 *
 * Visual representation of the model.
 */
export default class TruckCreateView {
    constructor(truckTypes) {
        this.truckTypes = truckTypes
        this.app = this.getElement('#root')
        this.form = this.createElement('form')


        this.createFirstStep()
        let btn = this.createElement('button')
        btn.innerHTML = "Next"
        btn.addEventListener('click', () => { this.createSecondStep(truckTypes) })
        this.form.append(btn)
        this.updateView();
    }

    updateView() {
        this.app.append(this.form)
    }

    createFirstStep() {
        this.createInput("input1", "Width")
        this.createInput("input1", "Length")
    }

    createSecondStep() {
        this.createInput("input2", "Interval")
        this.createSelect("input2", "Truck Type", this.truckTypes)
        // this.updateView();
    }

    createInput(id, label) {
        this.createLabel(id, label)

        let br = this.createElement('br')
        let input = this.createElement('input')
        input.type = 'text'
        input.id = id

        this.form.append(input, br)
    }

    createLabel(id, labelText) {
        let label = this.createElement('label')
        label.setAttribute('for', id)
        label.innerHTML = labelText
        this.form.append(label)
    }

    createSelect(id, label, options) {
        this.createLabel(id, label)

        let selector = this.createElement('select')

        for (let i = 0; i < options.length; i++) {
            const option = this.createElement("option");
            option.value = options[i];
            option.text = options[i];
            selector.append(option);
        }

        this.form.append(selector)
    }

    createElement(tag, className) {
        const element = document.createElement(tag)

        if (className) element.classList.add(className)

        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }
}
