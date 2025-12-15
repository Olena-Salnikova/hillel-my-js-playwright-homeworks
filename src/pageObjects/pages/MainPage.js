import { expect } from "@playwright/test";
import BasePage from "./BasePage.js";
import { RegistrationPopup } from "../components/RegistrationPopup.js";
import { LoginPopup } from "../components/LoginPopup.js";

export default class MainPage extends BasePage {
    constructor(page) {
        super(page, "/");
    }

    async openSignupPopup() {
        this.signupBtn = this.page.getByRole("button", { name: "Sign up" });
        await this.signupBtn.click();
        await expect(this.page.getByText("Registration")).toBeVisible();
        return new RegistrationPopup(this.page);
    }

    async loginAsUser(email, password){
        await this.page.getByText("Sign In").click();
        console.log("Login as user:", email);
        const login = new LoginPopup(this.page);
        return login.login({email, password});
    }
}