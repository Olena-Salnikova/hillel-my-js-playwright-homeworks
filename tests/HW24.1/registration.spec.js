import {test, expect} from "@playwright/test";
import {faker} from '@faker-js/faker';

test.describe("Registration form", () => {
    const prefix = "qauto_os";

    const userData = {
    "name": faker.person.firstName(),
    "lastName": faker.person.lastName(),
    "email": `${prefix}_${faker.string.alphanumeric(6)}@example.com`,
    "password": faker.internet.password({
        length: faker.number.int({ min: 8, max: 15 }),
        prefix: "Aa1"
    }),
    };

    test.beforeEach(async ({page}) => {
        await page.goto('/');

        const signupBtn = page.locator(".btn-primary", {hasText: "Sign up"});
        await signupBtn.click();
    });

    test("Positive: register new user with valid data", async ({page}) => {

        const signupPopup = page.locator(".modal-content");
        const nameInput = signupPopup.locator("#signupName");
        const lastNameInput = signupPopup.locator("#signupLastName");
        const emailInput = signupPopup.locator("#signupEmail");
        const passwordInput = signupPopup.locator("#signupPassword");
        const repeatPasswordInput = signupPopup.locator("#signupRepeatPassword");
        const registerBtn = signupPopup.locator(".btn-primary");

        await nameInput.fill(userData.name);
        await lastNameInput.fill(userData.lastName);
        await emailInput.fill(userData.email);
        await passwordInput.fill(userData.password);
        await repeatPasswordInput.fill(userData.password);
        await registerBtn.click();

        await expect(page).toHaveURL("/panel/garage");
    }); 

    test("Negative: empty first name", async ({ page }) => {
        const signupPopup = page.locator(".modal-content");

        await signupPopup.locator("#signupName").fill("");
        await signupPopup.locator("#signupName").blur();

        await expect(signupPopup.locator("#signupName")).toHaveAttribute("class", /is-invalid/);
        await expect(signupPopup.locator("div.invalid-feedback")).toContainText("Name required");
    });

    test("Negative: empty last name", async ({ page }) => {
        const signupPopup = page.locator(".modal-content");

        await signupPopup.locator("#signupLastName").fill("");
        await signupPopup.locator("#signupLastName").blur();

        await expect(signupPopup.locator("#signupLastName")).toHaveAttribute("class", /is-invalid/);
        await expect(signupPopup.locator("div.invalid-feedback")).toContainText("Last name required");
    });

    test("Negative: empty email", async ({ page }) => {
        const signupPopup = page.locator(".modal-content");

        await signupPopup.locator("#signupEmail").fill("");
        await signupPopup.locator("#signupEmail").blur();

        await expect(signupPopup.locator("#signupEmail")).toHaveAttribute("class", /is-invalid/);
        await expect(signupPopup.locator("div.invalid-feedback")).toContainText("Email required");
    });

    test("Negative: invalid email format", async ({ page }) => {
        const signupPopup = page.locator(".modal-content");

        await signupPopup.locator("#signupEmail").fill("invalid_email");
        await signupPopup.locator("#signupEmail").blur();

        await expect(signupPopup.locator("#signupEmail")).toHaveAttribute("class", /is-invalid/);
        await expect(signupPopup.locator("div.invalid-feedback")).toContainText("Email is incorrect");
    });

    test("Negative: password too short", async ({ page }) => {
        const signupPopup = page.locator(".modal-content");

        await signupPopup.locator("#signupPassword").fill("Aa1");
        await signupPopup.locator("#signupPassword").blur();

        await expect(signupPopup.locator("#signupPassword")).toHaveAttribute("class", /is-invalid/);
        await expect(signupPopup.locator("div.invalid-feedback")).toContainText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");                          
    });

    test("Negative: passwords do not match", async ({ page }) => {
        const signupPopup = page.locator(".modal-content");


        await signupPopup.locator("#signupPassword").fill(userData.password);
        await signupPopup.locator("#signupPassword").blur();
        await signupPopup.locator("#signupRepeatPassword").fill("Aa111111");
        await signupPopup.locator("#signupRepeatPassword").blur();

        await expect(signupPopup.locator("#signupRepeatPassword")).toHaveAttribute("class", /is-invalid/);
        await expect(signupPopup.locator("div.invalid-feedback")).toContainText("Passwords do not match");
    });

    test("Negative: last name too short", async ({ page }) => {
        const signupPopup = page.locator(".modal-content");

        await signupPopup.locator("#signupLastName").fill("A");
        await signupPopup.locator("#signupLastName").blur();

        await expect(signupPopup.locator("#signupLastName")).toHaveAttribute("class", /is-invalid/);
        await expect(signupPopup.locator("div.invalid-feedback")).toContainText("Last name has to be from 2 to 20 characters long");
    });

    test("Negative: first name too long", async ({ page }) => {
        const signupPopup = page.locator(".modal-content");

        await signupPopup.locator("#signupName").fill("A".repeat(30));
        await signupPopup.locator("#signupName").blur();

        await expect(signupPopup.locator("#signupName")).toHaveAttribute("class", /is-invalid/);
        await expect(signupPopup.locator("div.invalid-feedback")).toContainText("Name has to be from 2 to 20 characters long");
    });

    test("Negative: email already exists", async ({ page }) => {
        const existingEmail = "guest@example.com";
        const signupPopup = page.locator(".modal-content");

        await signupPopup.locator("#signupName").fill(userData.name);
        await signupPopup.locator("#signupLastName").fill(userData.lastName);
        await signupPopup.locator("#signupEmail").fill(existingEmail);
        await signupPopup.locator("#signupPassword").fill(userData.password);
        await signupPopup.locator("#signupRepeatPassword").fill(userData.password);
        await signupPopup.locator(".btn-primary").click({ force: true });

        await expect(page.locator(".alert-danger")).toHaveText(/User already exists/);
    });

});
