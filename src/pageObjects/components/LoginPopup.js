import BaseComponent from "./BaseComponent.js";
import {expect, test} from "@playwright/test";

export class LoginPopup extends BaseComponent {
    constructor(page) {
        super(page);
        this.container = page.locator(".modal-content");
        this.email = this.container.getByLabel("Email");
        this.password = this.container.getByLabel("Password");
        this.loginBtn =  this.container.getByRole("button", {name: "Login"});
    }

    async login({email, password}){
        await test.step(`Login (Email ${email} Password ${password})`, async () => {
            await this.email.fill(email);
            await this.password.fill(password);
            await this.loginBtn.click();
            await expect(this.page.getByText("Log out")).toBeVisible();
        });
    }
}
