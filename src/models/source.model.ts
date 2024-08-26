import mongoose, { Document, Schema } from "mongoose";
import { IDocumentModel } from "./document.model";

export interface ISource {
    chromaCollectionName: string;
    name: string;
    description: string;
    numDocs: number;
}

export interface ISourceModel extends ISource, Document { }

const SourceSchema: Schema = new Schema({
    chromaCollectionName: {
        type: String,
        required: [ true, 'Chroma Collection Name is required' ]
    },
    name: {
        type: String,
        required: [ true, 'Name of Source is required' ]
    },
    description: {
        type: String,
    },
    numDocs: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

export default mongoose.model<ISourceModel>("Source", SourceSchema);

