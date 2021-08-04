import mongoose, { Schema, Model } from "mongoose";
import { UserKey, UserRole } from '../../models';

export const DOCUMENT_NAME = 'ApiKey';
export const COLLECTION_NAME = 'api-key';

const schema = new Schema<UserKey>({
    apiKey: {
        type: Schema.Types.String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: Schema.Types.String,
        enum: UserRole,
        default: UserRole.USER,
        required: true,
    }
})

export const userKeyModel = mongoose.model(DOCUMENT_NAME, schema, COLLECTION_NAME);