import axios from "axios";
import * as xml2js from "xml2js";

export const fetchAndParseSitemap = async (sitemapUrl: string) => {
	try {
		console.log("Fetching site map...");
		const response = await axios.get(sitemapUrl);
		console.log("Parsing site map...");
		const xml = response.data;
		const parsed = await xml2js.parseStringPromise(xml);
		const urls = parsed.urlset.url.map((u: any) => u.loc[0]);
		console.log(`Found ${urls.length} URLs in sitemap`);
		return urls;
	} catch (error) {
		console.log("Error fetching or parsing sitemap", error);
		throw new Error(`Error fetching or parsing sitemap: ${error}`);
	}
};
