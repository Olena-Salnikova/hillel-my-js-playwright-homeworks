export default class BaseComponent {
    constructor(page, container) {
        this.page = page;
        this.container = container ?? page.locator("body");
    }

    async waitLoaded() {
        await this.container.waitFor({state: "visible"});
    }
}