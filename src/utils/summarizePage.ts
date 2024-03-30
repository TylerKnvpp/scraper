import openai from "../services/openai";

export const summarizePage = async (text: string) => {
	try {
		console.log("Cleaning up site content...");
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-16k-0613",
			messages: [
				{
					role: "system",
					content:
						"You are a expert summarizer. You will receive text from a website. Please extract the useful content.",
				},
				{
					role: "user",
					content: text,
				},
			],
		});
		console.log(
			`Summarized text: ${response.choices[0].message.content?.substring(
				0,
				100
			)}`
		);
		return response.choices[0].message.content;
	} catch (error) {
		throw new Error(`Error summarizing text: ${error}`);
	}
};
