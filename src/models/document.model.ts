import mongoose, { Document, Schema } from "mongoose";

export interface IDocument {
	docType: string;
	url: string;
	chromaCollectionName: string;
	embeddingStatus: string;
	name: string;
}

export interface IDocumentModel extends IDocument, Document { }

const DocumentSchema: Schema = new Schema(
	{
		docType: {
			type: String,
			required: [ true, "Document type is required" ]
		},
		url: {
			type: String,
			required: [ true, "Document url is required" ]
		},
		chromaCollectionName: {
			type: String,
			required: [ true, "Chroma Collection Name is required" ]
		},
		embeddingStatus: {
			type: String,
			default: "PENDING",
			enum: [ 'PENDING', 'IN_PROGRESS', "DONE", "FAILED" ]
		},
		name: {
			type: String,
		},

	},
	{ timestamps: true }
);

export default mongoose.model<IDocumentModel>("Document", DocumentSchema);
