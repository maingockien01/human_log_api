import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Tag } from "../../models";

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'user';

@Entity()
export class User {
    @ObjectIdColumn()
    _id?: string;
    
    @Column()
    apiKey: string;

}

@Entity()
export class UserLog {

    @Column()
    userId: User['_id'];
    
    @Column()
    logId: ['_id'];
}

@Entity()
export class UserEvent {
    
    @Column()
    userId: User['_id'];
    
    @Column()
    eventId: ['_id'];
}

@Entity()
export class UserStat {
    
    @Column()
    userId: User['_id'];
    
    @Column()
    statId: ['_id'];
}

export class UserTag {
    userId: User['_id'];
    tagId: Tag['_id'];
}
