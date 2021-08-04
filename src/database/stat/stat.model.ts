import mongoose, { Schema } from "mongoose";
import { Stat } from "../../models";

export const DOCUMENT_NAME = 'Stat';
export const COLLECTION_NAME = 'stat';


const schema = new Schema<Stat> ({
    name: {
        type: Schema.Types.String,
        maxLength: 200, 
        required: true,
    },
    context: {
        type: Schema.Types.String,
        required: false,
    },
    valueType: {
        type: Schema.Types.String,
        required: true,
    },
    default: {
        type: Schema.Types.String,
        required: false,
    }
})

export const statModel = mongoose.model<Stat>(DOCUMENT_NAME, schema, COLLECTION_NAME);