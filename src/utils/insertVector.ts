import supabase from "../services/supabase";

export const insertVector = async (
	embedding: number[],
	url: string,
	text: string
) => {
	try {
		const { data, error } = await supabase.from("Reference").insert({
			text,
			embedding,
			url,
		});

		if (error) {
			console.log(JSON.stringify(error));
			throw new Error(`Error inserting vector: ${error}`);
		}

		console.log("Inserted vector for", url);

		return data;
	} catch (error) {
		throw new Error(`Error inserting vector: ${error}`);
	}
};
