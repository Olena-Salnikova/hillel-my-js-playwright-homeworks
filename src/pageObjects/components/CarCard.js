import BaseComponent from "./BaseComponent.js";
import {expect} from "@playwright/test";

export default class CarCard extends BaseComponent {
    constructor(page, container) {
        super(page);
        this.page = page;
        this.container = container;

       this.mileageInput = this.container.locator('[name="miles"]');
    }

    async assertBrand(expected){
        await expect(this.container, "Car should have valid brand").toContainText(expected);
    }

    async assertModel(expected){
        await expect(this.container, "Car should have valid model").toContainText(expected);
    }

    async assertMileage(expected){
        await expect(this.mileageInput, "Mileage should be valid").toHaveValue(expected);
    }
}