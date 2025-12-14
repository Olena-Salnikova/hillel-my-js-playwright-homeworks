import {test as base} from "playwright/test";
import MainPage from "../pageObjects/pages/MainPage.js";

export const baseCustomFixture = base.extend({
    mainPage: async ({page}, use)=> {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        await use(mainPage);
    },
});