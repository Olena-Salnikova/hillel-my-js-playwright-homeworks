import { expect } from "@playwright/test";
import BasePage from "./BasePage.js";
import { RegistrationPopup } from "../components/RegistrationPopup.js";

export class MainPage extends BasePage {
    constructor(page) {
        super(page, "/");
        this.signupBtn = page.getByRole("button", { name: "Sign up" });
    }

    async openSignupPopup() {
        await this.signupBtn.click();
        await expect(this.page.getByText("Registration")).toBeVisible();
        return new RegistrationPopup(this.page);
    }
}