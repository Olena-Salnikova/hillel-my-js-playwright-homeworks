import BaseComponent from "./BaseComponent.js";
import {test} from "@playwright/test";


export default class AddCarPopup extends BaseComponent {
    constructor(page) {
        super(page);
        this.container = page.locator(".modal-content");
        this.brandSelect = this.container.getByLabel("Brand");
        this.modelSelect =  this.container.getByLabel("Model");
        this.mileageInput =  this.container.getByRole("spinbutton", {name: "Mileage"});
        this.submitBtn =  this.container.getByRole("button", {name: "Add"});
    }

    async fillForm({brand, model, mileage}) {
        await test.step(`Create a new car (Brand ${brand} model ${model})`, async () => {
            await this.brandSelect.selectOption(brand);
            await this.modelSelect.selectOption(model);
            await this.mileageInput.fill(mileage);
        });
    }

    async createCar({brand, model, mileage}) {
        await this.fillForm({brand, model, mileage});
        await this.submitBtn.click();
    }
}