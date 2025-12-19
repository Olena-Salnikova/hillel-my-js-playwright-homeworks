import {userGaragePageTest} from "../../src/customFixtures/userGaragePage.js";
import {expect} from "@playwright/test";

userGaragePageTest.describe("Create a car as the user (Fixtures)", () => {
    userGaragePageTest("Create car", async ({ browser }) => {
        const apiContext = await browser.newContext({
            storageState: 'state/userStorageState.json'
        });
        const request = apiContext.request;

        await userGaragePageTest.step("Create a new car - positive test", async () => {
              const response = await request.post("/api/cars", {
                  data : {
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 123
                }
              });

              await expect(response, "Positive test: Creating a new car with valid data should succeed").toBeOK();
        });

        await userGaragePageTest.step("Create a new car - first negative test with invalid data", async () => {
                const response = await request.post("/api/cars", {
                    data : {
                      "carBrandId": 0,
                      "carModelId": 0,
                      "mileage": 123
                  }
                });
                await expect(response.status(), "First negative test: Creating a new car with invalid data should return 404").toBe(404);
        });

        await userGaragePageTest.step("Create a new car - second negative test with missing data", async () => {
                const response = await request.post("/api/cars", {
                    data : {
                      "mileage": 123
                  }
                });
                await expect(response.status(), "Second negative test: Creating a new car with missing data should return 400").toBe(400);
        });
        await apiContext.close();
    });
});
