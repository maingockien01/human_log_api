import { ObjectId } from "mongoose";
import { Stat, Tag } from ".";
import { User } from "./user.model";

export class Event {
    _id?: string;
    name: string;
    context?: string;
    stats: Stat[];
    tags?: Tag[];
    user: User;
}
