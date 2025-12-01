export class MainPage {
    constructor(page) {
        this.page = page;
        this.signupBtn = page.getByRole("button", { name: "Sign up" });
    }

    async open() {
        await this.page.goto("/");
    }

    async openSignupPopup() {
        await this.signupBtn.click();
    }
}