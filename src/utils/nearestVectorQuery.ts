import supabase from "../services/supabase";

export const nearestVectorQuery = async (embedding: number[]) => {
	try {
		const { data, error } = await supabase.rpc("nearest_vector_query", {
			query_embedding: embedding,
			match_threshold: 0.78,
			match_count: 5,
		});
		if (error) {
			throw new Error(`Error querying nearest vector: ${error}`);
		}
		console.log("Nearest vector query result:", data.url);
		return data;
	} catch (error) {
		throw new Error(`Error querying nearest vector: ${error}`);
	}
};
