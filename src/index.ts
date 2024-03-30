import { fetchAndParseSitemap } from "./utils/fetchAndParseSitemap";
import { scrapeInnerText } from "./utils/scrapeInnerText";
import { shouldVectorizeContent } from "./utils/shouldVectorizeContent";
import dotenv from "dotenv";
import { summarizePage } from "./utils/summarizePage";
import { vectorizeText } from "./utils/vectorizeText";
import { insertVector } from "./utils/insertVector";
dotenv.config();

const run = async () => {
	try {
		const urls = await fetchAndParseSitemap(process.env.SITEMAP_URL as string);

		let slicedUrls = urls.slice(0, 100);

		for (const url of slicedUrls) {
			await processUrl(url);
		}
	} catch (error) {
		throw new Error(`Error running scraping script: ${error}`);
	}
};

const processUrl = async (url: string) => {
	try {
		const innerText = await scrapeInnerText(url);
		const shouldVectorize = await shouldVectorizeContent(innerText);
		if (shouldVectorize) {
			const cleanContent = await summarizePage(innerText);
			if (!cleanContent) {
				throw new Error("Failed to summarize content");
			}
			console.log("Vectorizing content...");
			const embedding = await vectorizeText(cleanContent);
			console.log("Inserting vector into db...");
			const insertedRecord = await insertVector(embedding, url, cleanContent);
			console.log("Inserted record:", insertedRecord);
		} else {
			console.log("Content not worth vectorizing");
		}
	} catch (error) {
		throw new Error(`Error processing URL: ${error}`);
	}
};
run();
