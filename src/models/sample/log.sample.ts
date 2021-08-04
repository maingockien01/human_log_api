import { breakfast, wakeup } from "./event.sample";
import { Log } from "../log.model";
import { Timestamp } from "mongodb";

export const log1: Log = {
    event: wakeup,
    statValues: [
        {
            statId: wakeup.stats[0]._id,
            value: '7:30'
        }
    ],
    user: '60fefd5c387bed05bc9868bc',
    timestamp: new Date(Date.now()),
}

export const log2: Log = {
    event: breakfast,
    statValues: [
        {
            statId: breakfast.stats[0]._id,
            value: '08:00'
        }
    ],
    
    user: '60fefd5c387bed05bc9868bc',
    timestamp: new Date(Date.now()),
}