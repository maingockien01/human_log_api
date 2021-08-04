import { wakeup } from "../../models/sample/event.sample";
import { Event } from "../../models";
import { EventRepo } from "./event.repo";
import { eventModel } from "./event.model";

describe('Test Even Repo', () => {
    it('Should perform well', async () => {
        let sampleEvent: Event = wakeup;
        delete sampleEvent._id;

        expect(sampleEvent._id).toBeUndefined();

        let createdEvent = await EventRepo.writeEvent(wakeup);

        expect(createdEvent._id).toBeDefined();

        let searchedEvent = await EventRepo.getById(createdEvent._id);
    
        expect(searchedEvent).toBe(createdEvent);

        await eventModel.findByIdAndDelete(createdEvent._id);
    })
})