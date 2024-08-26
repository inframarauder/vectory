import { Request, Response, NextFunction } from "express";
import Document from "../models/document.model";
import document from "../utils/document"
import { ChromaClient } from "chromadb";
import { Ollama } from "ollama";


export default {
	createDocument: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const document = await Document.create(req.body);
			return res.status(201).json(document);
		} catch (error) {
			next(error);
		}
	},
	createEmbedding: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const chunkSize = 100;
			const overlapSize = 20;
			const text: string = await document.readText(req.body.url);
			const chunks: string[] = document.splitText(text, chunkSize, overlapSize)

			console.log('Chunks', chunks)

			// get embeddings
			const ollama = new Ollama({
				host: process.env.OLLAMA_URL
			});

			const embeddings = await ollama.embed({
				model: 'nomic-embed-text',
				input: chunks
			})

			console.log('Embeddings', embeddings)

			// save embeddings
			const chromaClient = new ChromaClient({
				path: process.env.CHROMA_URL
			})

			const collection = await chromaClient.getOrCreateCollection({
				name: req.body.chromaCollectionName,
			})

			await collection.add({
				ids: [ ...Array(chunks.length).keys() ].map(i => i.toString()),
				embeddings: embeddings.embeddings,
				documents: chunks
			})


			res.sendStatus(201)

		} catch (error) {
			next(error)
		}
	}
};
