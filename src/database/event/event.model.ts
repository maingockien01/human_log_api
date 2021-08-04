import mongoose, { Schema } from "mongoose";
import { Event } from "../../models";

import { DOCUMENT_NAME as DOCUMENT_STAT } from '../stat/stat.model';
import { DOCUMENT_NAME as DOCUMENT_TAG } from '../tag/tag.model';

export const DOCUMENT_NAME = 'Event';
export const COLLECTION_NAME = 'event';

const schema = new Schema<Event> ({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    context: {
        type: Schema.Types.String,
        required: false,
    },
    stats: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: DOCUMENT_STAT,
    },
    tags: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: DOCUMENT_TAG,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
})

export const eventModel = mongoose.model<Event>(DOCUMENT_NAME, schema, COLLECTION_NAME)