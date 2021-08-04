import { Tag } from "../../models";
import { Pipeline } from "./interface";



export class TagPipeline implements Pipeline<Tag> {
    hookUser(userId: string, tagId: string) {

    }

    write (tag: Tag): string {      
        return '';
    }

    remove (tagId: string) {

    }
}