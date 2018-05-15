import puppeteer from 'puppeteer';

describe('Login Module', () => {
    it('Test Home Page', async () => {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto('http://localhost:3000');
        const html = await page.$eval('h1', (e) => e.innerHTML);
        expect(html).toBe('Login');
        browser.close();
    })
})
