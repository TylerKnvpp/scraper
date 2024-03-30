import openai from "../services/openai";

export const vectorizeText = async (text: string) => {
	try {
		const response = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: text,
			encoding_format: "float",
		});
		console.log("Content vectorized");
		return response.data[0].embedding;
	} catch (error) {
		throw new Error(`Error vectorizing text: ${error}`);
	}
};
