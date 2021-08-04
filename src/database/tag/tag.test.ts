import { daily } from "../../models/sample/tag.sample";
import TagRepo from "./tag.repo";
import '../index';
import { Tag } from "../../models/tag.model";

describe('Test tag repo', () => {
    it ('Should perform all needed functions', async () => {
        let sampleTag = daily;
        delete sampleTag._id;

        expect(sampleTag._id).toBeUndefined();

        let createdTag = await TagRepo.create(daily);

        expect(createdTag._id).toBeDefined();

        let searchedTags = await TagRepo.getTags(createdTag.user._id);

        expect(searchedTags).toContainEqual<Tag>(createdTag);

        await TagRepo.deleteTag(createdTag._id);

        let searchedTag = await TagRepo.getTag(createdTag._id);

        expect(searchedTag).toBe(null);
    });
})