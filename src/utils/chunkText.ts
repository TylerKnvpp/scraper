import chunk from "chunk-text";
export const createChunks = (text: string) => {
	return chunk(text, 7500);
};
