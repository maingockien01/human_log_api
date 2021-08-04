import { eventModel } from "./event.model";
import { Event } from '../../models';

export class EventRepo {
    public static async writeEvent (event: Event): Promise<Event | null> {
        return eventModel.create(event).lean<Event>().exec();
    }
    public static async getById (id: string) {
        return eventModel.findById(id).lean<Event>().exec();
    }

    public static async getEventsByUser (userId: string) : Promise<Event[]> {
        return await eventModel.find({user: {_id: userId}}).lean<Event[]>().exec();
    }

    public static async getEvents (filter) : Promise<Event[]> {
        return await eventModel.find(filter).lean<Event[]>().exec();
    }

    public static async updateEvent (event: Event, filter?) : Promise<number> {
        if (!filter) {
            filter = {
                _id: event._id,
            }
        }

        return (await eventModel.updateMany(filter, { $set : {...event}})).nModified;
    }
}