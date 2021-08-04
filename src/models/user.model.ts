import { Event } from "./event.model";
import { Log } from "./log.model";
import { Stat } from "./stat.model";
import { Tag } from "./tag.model";


export class User {
    _id?: string;
    apiKey?: string;
}

export class UserLog {

    userId: User['_id'];
    logId: Log['_id'];
}

export class UserEvent {
    userId: User['_id'];
    eventId: Event['_id'];
}

export class UserTag {
    userId: User['_id'];
    tag: Tag;
}

export class UserStat {
    userId: User['_id'];
    statId: Stat['_id'];
}
