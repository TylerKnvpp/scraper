import openai from "../services/openai";

export const shouldVectorizeContent = async (content: string) => {
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: false,
			max_tokens: 4000,
			messages: [
				{
					role: "system",
					content:
						"You will be provided content scraped from a website. Determine if the provided content is worth vectorizing and saving to a database. Examples of content that is not vectorizable would be site navigation material or other non-content related information without any specialized content. If the content is worth vectorizing, return 'true'. If the content is not worth vectorizing, return 'false'.",
				},
				{
					role: "user",
					content,
				},
			],
			tools: [
				{
					type: "function",
					function: {
						name: "shouldVectorizeContent",
						description: "Determine if the content is worth saving.",
						parameters: {
							type: "object",
							properties: {
								shouldVectorize: {
									type: "number",
									description:
										"Return a value 0 through 10 to indicate the worthiness of the content where 10 indicates the content is worth vectorizing and 0 means to skip.",
								},
								explanation: {
									type: "string",
									description:
										"An explanation of why the content is or is not valuable.",
								},
							},
							required: ["content", "explanation"],
						},
					},
				},
			],
		});

		const toolCalls = response?.choices[0]?.message?.tool_calls;

		if (toolCalls?.length) {
			const workflowWithArgs = toolCalls[0].function;

			if (workflowWithArgs) {
				if (workflowWithArgs.name === "shouldVectorizeContent") {
					const parsedArguments = JSON.parse(workflowWithArgs.arguments);
					console.log(
						"Content score for page: ",
						parsedArguments.shouldVectorize
					);
					if (parsedArguments.shouldVectorize <= 5) {
						return false;
					} else {
						return parsedArguments.shouldVectorize;
					}
				}
			}
		}

		return false;
	} catch (error) {
		return false;
	}
};
