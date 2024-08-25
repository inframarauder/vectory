import dotenv from "dotenv";

dotenv.config();

export default {
	chromadb :{
		url: process.env.CHROMA_URL || ""
	},
	ollama : {
		url: process.env.OLLAMA__API_URL || ""
	},
	mongo: {
		uri: process.env.MONGO_URI || "",
	},
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : 3000,
	},
};
