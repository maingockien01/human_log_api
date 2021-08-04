import { Tag } from "../../models";
import { tagModel } from '../models';

export default class TagRepo {

    public static async create(tag: Tag): Promise<Tag> {

        const createdTag: Tag = (await tagModel.create(tag)).toObject();

        console.log(createdTag);

        return createdTag;
    }

    public static async getTags(userId: string): Promise<Tag[] | null> {
        const tags: Tag[] = (await tagModel.find({user: {_id: userId} })).map(tag => tag.toObject());
        return tags;
    }

    public static async getTag (tagId: string): Promise<Tag | null> {
        return await tagModel.findById({_id: tagId}).lean<Tag>().exec();
    }

    public static async deleteTag (tagId: string): Promise<number> {
        return (await tagModel.deleteOne({_id: tagId})).deletedCount;
    }

    public static async updateTag (tag: Tag, filter = {_id: tag._id}): Promise<number> {
        return (await tagModel.updateMany(filter, {...tag})).nModified;
    }
}