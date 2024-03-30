import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export const scrapeInnerText = async (url: string) => {
	try {
		console.log("Launching browser...");
		const browser = await puppeteer.launch();
		console.log("Navigating to page...", url);
		const page = await browser.newPage();
		await page.goto(url);
		console.log("Scraping inner text...");
		const innerText = await page.evaluate(() => document.body.innerText);
		console.log("Closing browser...");
		await browser.close();
		return innerText.replace(/[^\w\s]/gi, "");
	} catch (error) {
		throw new Error(`Error scraping inner text: ${error}`);
	}
};
