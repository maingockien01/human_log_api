import { User } from "./user.model";

export class Tag {
    _id?: string;
    name: string;
    context?: string;
    user: User;

    constructor (name: string, context?: string) {
        this.name = name;
        if (context) {
            this.context = context;
        }
    }
}
