import { userProfilePageTest } from "../../src/customFixtures/userProfilePage";
import { expect, test } from "@playwright/test";

userProfilePageTest("User profile - mocked response", async ({ browser }) => {
    const mockedProfileResponse = {
        "status": "ok",
        "data": {
            "photoFilename": "default-user.png",
            "name": "TestName",
            "lastName": "TestLastName"
        }
    };

    const newContext = await browser.newContext({
        storageState: 'state/userStorageState.json'
    });
    const newPage = await newContext.newPage();

    await newPage.route('**/*', async route => {
        const url = route.request().url();
        const resourceType = route.request().resourceType();
        
        if (url.includes('profile') && resourceType === 'xhr') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedProfileResponse)
            });
        } else {
            await route.continue();
        }
    });

    await test.step("Navigate and verify", async () => {
        await newPage.goto('https://qauto.forstudy.space/panel/profile');
        await newPage.waitForTimeout(500);
        await expect(newPage.locator('.profile_name')).toHaveText('TestName TestLastName');
    });

    await newContext.close();
});