import mongoose, { Schema } from "mongoose";
import { Tag } from "../../models";

export const DOCUMENT_NAME = 'Tag';
export const COLLECTION_NAME = 'tag';

const schema = new Schema<Tag>({
    name: {
        required: true,
        type: Schema.Types.String,
    },
    context: {
        type: Schema.Types.String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const tagModel = mongoose.model<Tag & Document>(DOCUMENT_NAME, schema, COLLECTION_NAME);

export default tagModel;