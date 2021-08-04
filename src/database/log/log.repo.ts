import { Log } from '../../models';
import { logModel } from './log.model'; 

const INTERVAL_24_HOUR = 86400000; //milisecond

export class LogRepo {
    public static async getById (id: string): Promise<Log> {
        return logModel.findById(id);
    }

    public static async writeLog (log: Log): Promise<Log> {
        
        return (await logModel.create(log)).toObject();
    }

    public static async updateLog (log: Log): Promise<Log> {
        return logModel.findOneAndUpdate({_id: log._id}, { $set : { ...log }});
    }

    public static async deleteLog (log: Log): Promise<void> {
        logModel.findByIdAndDelete(log._id);
    }

    public static async getByInterval (userId: string, from: Date = new Date(Date.now() - INTERVAL_24_HOUR), to: Date = new Date(Date.now())): Promise<Log[] | null> {

        return logModel.find({
            user: userId,
            timestamp: {$gte: from, $lte: to},
        }).lean<Log[]>().exec();
    }
}

