import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage } from "../../src/pageObjects/main/MainPage";
import { Registration } from "../../src/pageObjects/main/Registration";

test.describe("Registration form (POM)", () => {
    const prefix = "qauto_os";

    const userData = {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `${prefix}_${faker.string.alphanumeric(6)}@example.com`,
        password: faker.internet.password({
            length: faker.number.int({ min: 8, max: 15 }),
            prefix: "Aa1"
        }),
    };

    test.beforeEach(async ({ page }) => {
        const home = new MainPage(page);
        await home.open();
        await home.openSignupPopup();
    });

    test("Positive: register new user with valid data", async ({ page }) => {
        const reg = new Registration(page);

        await reg.fillRegistrationForm({
            name: userData.name,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            repeatPassword: userData.password,
        });

        await reg.submit();

        await expect(page).toHaveURL("/panel/garage");
    });

    test("Negative: empty first name", async ({ page }) => {
        const reg = new Registration(page);

        await reg.name.fill("");
        await reg.name.blur();

        await expect(reg.name).toHaveAttribute("class", /is-invalid/);
        await expect(reg.error).toContainText("Name required");
    });

    test("Negative: empty last name", async ({ page }) => {
        const reg = new Registration(page);

        await reg.lastName.fill("");
        await reg.lastName.blur();

        await expect(reg.lastName).toHaveAttribute("class", /is-invalid/);
        await expect(reg.error).toContainText("Last name required");
    });

    test("Negative: empty email", async ({ page }) => {
        const reg = new Registration(page);

        await reg.email.fill("");
        await reg.email.blur();

        await expect(reg.email).toHaveAttribute("class", /is-invalid/);
        await expect(reg.error).toContainText("Email required");
    });

    test("Negative: invalid email format", async ({ page }) => {
        const reg = new Registration(page);

        await reg.email.fill("invalid_email");
        await reg.email.blur();

        await expect(reg.email).toHaveAttribute("class", /is-invalid/);
        await expect(reg.error).toContainText("Email is incorrect");
    });

    test("Negative: password too short", async ({ page }) => {
        const reg = new Registration(page);

        await reg.password.fill("Aa1");
        await reg.password.blur();

        await expect(reg.password).toHaveAttribute("class", /is-invalid/);
        await expect(reg.error).toContainText("Password has to be from 8 to 15 characters long");
    });

    test("Negative: passwords do not match", async ({ page }) => {
        const reg = new Registration(page);

        await reg.password.fill(userData.password);
        await reg.repeatPassword.fill("Aa111111");
        await reg.repeatPassword.blur();

        await expect(reg.repeatPassword).toHaveAttribute("class", /is-invalid/);
        await expect(reg.error).toContainText("Passwords do not match");
    });

    test("Negative: last name too short", async ({ page }) => {
        const reg = new Registration(page);

        await reg.lastName.fill("A");
        await reg.lastName.blur();

        await expect(reg.lastName).toHaveAttribute("class", /is-invalid/);
        await expect(reg.error).toContainText("Last name has to be from 2 to 20 characters long");
    });

    test("Negative: first name too long", async ({ page }) => {
        const reg = new Registration(page);

        await reg.name.fill("A".repeat(30));
        await reg.name.blur();

        await expect(reg.name).toHaveAttribute("class", /is-invalid/);
        await expect(reg.error).toContainText("Name has to be from 2 to 20 characters long");
    });

    test("Negative: email already exists", async ({ page }) => {
        const reg = new Registration(page);

        await reg.fillRegistrationForm({
            name: userData.name,
            lastName: userData.lastName,
            email: "guest@example.com",
            password: userData.password,
            repeatPassword: userData.password,
        });

        await reg.submit();

        await expect(reg.alert).toHaveText(/User already exists/);
    });
});