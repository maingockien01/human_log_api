import { StatValue } from "./statValue.model";
import { Event } from './event.model';

export class Log {
    _id?: string;
    event: Event;
    timestamp: Date;
    statValues: StatValue[];
    user: string;
    
}