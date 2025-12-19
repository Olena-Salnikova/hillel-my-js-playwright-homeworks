import BasePage from "./BasePage.js";

export default class ProfilePage extends BasePage {
    constructor(page) {
        super(page, "/panel/profile");
        this.usernameInput = page.getByLabel("Username");
        this.emailInput = page.getByLabel("Email");
        this.saveButton = page.getByRole("button", {name: "Save"});
    }
}