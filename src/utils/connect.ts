/**
 * connections to various external services like
 * MongoDB
 * ChromaDB
 */

import mongoose from "mongoose";
import { ChromaClient } from "chromadb";
import Logger from "./logger";

export default {
	mongodb: async (uri: string) => {
		try {
			mongoose.set('strictQuery', true) // to suppress a deprecation warning - no idea what this does lol
			await mongoose.connect(uri);
			Logger.info("MongoDB connected");
		} catch (error) {
			Logger.error("Error in connecting to MongoDB");
			Logger.error(error);
		}
	},
	chromadb: async (url: string) => {
		try {
			const chroma = new ChromaClient({ path: url })
			const heartbeat = await chroma.heartbeat()
			Logger.info(`ChromaDB connected : ${ heartbeat }`)
		} catch (error) {
			Logger.error("Error in connecting to ChromaDB")
			Logger.error(error)
		}
	}
};
