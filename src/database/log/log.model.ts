import mongoose, { Schema } from 'mongoose';
import { Log, StatValue } from '../../models';
import { DOCUMENT_NAME as DOCUMENT_EVENT } from '../event/event.model';

export const DOCUMENT_NAME = 'Log';
export const COLLECTION_NAME = 'log';

const statValueSchema = new Schema<StatValue> ({
    statId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    value: {
        type: Schema.Types.String,
        required: true,
    },
    
})

const schema = new Schema ({
    event: {
        type: Schema.Types.ObjectId,
        ref: DOCUMENT_EVENT,
        required: true,
    },
    timestamp: {
        type: Schema.Types.Date,
        required: true,
    },
    statValues: {
        type: [statValueSchema],
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

export const logModel = mongoose.model<Log>(DOCUMENT_NAME, schema, COLLECTION_NAME);