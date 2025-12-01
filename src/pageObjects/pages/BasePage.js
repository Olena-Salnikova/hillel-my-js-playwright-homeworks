export default class BasePage {
    constructor(page, url) {
        this.page = page;
        this.url = url;
    }
    async navigate() {
        await this.page.goto(this.url);
    }
} 