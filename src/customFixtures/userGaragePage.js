import { baseCustomFixture as base } from "./baseCustomFixture.js";
import GaragePage from "../pageObjects/pages/GaragePage.js";


// withLoggedInUser from storage state
export const userGaragePageTest = base.extend({
    page: async ({browser}, use)=> {
        const ctx = await browser.newContext({
            storageState: 'state/userStorageState.json'
        });
        const page = await ctx.newPage();
        await use(page);
        await ctx.close();
    },
    garagePage: async ({page}, use)=> {
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
    },
});