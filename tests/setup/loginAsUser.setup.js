import {test as setup} from "@playwright/test";
import MainPage from "../../src/pageObjects/pages/MainPage.js";

setup("Login as user", async ({page, context}) => {
    // store in .env file
    const userCredentials = {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD
    };

    const mainPage = new MainPage(page);
    await mainPage.navigate();
    await mainPage.loginAsUser(userCredentials.email, userCredentials.password);

    await context.storageState({
        path: "state/userStorageState.json"
    });
});