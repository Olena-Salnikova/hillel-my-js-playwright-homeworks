import {userGaragePageTest} from "../../src/customFixtures/userGaragePage.js";

userGaragePageTest.describe.only("Create a car as the user (Fixtures)", () => {
    userGaragePageTest("Create car", async ({garagePage}) => {
        const brand = "Audi";
        const model = "TT";
        const mileage = "123";

        await userGaragePageTest.step("Create a new car", async () => {
            const addCarPopup = await garagePage.openAddCarPopup();
            await addCarPopup.createCar({brand, model, mileage});
        });
    });
});