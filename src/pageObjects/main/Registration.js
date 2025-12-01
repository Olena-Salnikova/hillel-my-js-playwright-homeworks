export class Registration {
    constructor(page) {
        this.page = page;

        this.popup = page.locator(".modal-content");
        this.name = this.popup.locator("#signupName");
        this.lastName = this.popup.locator("#signupLastName");
        this.email = this.popup.locator("#signupEmail");
        this.password = this.popup.locator("#signupPassword");
        this.repeatPassword = this.popup.locator("#signupRepeatPassword");
        this.registerBtn = this.popup.locator(".btn-primary");

        this.error = this.popup.locator("div.invalid-feedback");
        this.alert = page.locator(".alert-danger");
    }

    async fillRegistrationForm({ name, lastName, email, password, repeatPassword }) {
        if (name !== undefined)      await this.name.fill(name);
        if (lastName !== undefined)  await this.lastName.fill(lastName);
        if (email !== undefined)     await this.email.fill(email);
        if (password !== undefined)  await this.password.fill(password);
        if (repeatPassword !== undefined) await this.repeatPassword.fill(repeatPassword);
    }

    async submit() {
        await this.registerBtn.click();
    }
}