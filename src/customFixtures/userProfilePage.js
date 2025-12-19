import { baseCustomFixture } from "./baseCustomFixture";
import ProfilePage from "../pageObjects/pages/ProfilePage.js";
// withLoggedInUser from storage state
export const userProfilePageTest = baseCustomFixture.extend({
    page: async ({browser}, use)=> {
        const ctx = await browser.newContext({
            storageState: 'state/userStorageState.json'
        });
        const page = await ctx.newPage();
        await use(page);
        await ctx.close();
    },
    profilePage: async ({page}, use)=> {
        const profilePage = new ProfilePage(page);
        await profilePage.navigate();
        await use(profilePage);
    },
});