import { Schema } from "mongoose";
import { LogRepo } from "../../database/log/log.repo";
import { Log } from "../../models";

class LogService {
    public async getLogs (userId: string, from?: Date, to?: Date): Promise<Log[]> {
        return LogRepo.getByInterval(userId, from, to);
    }

    public async getLog (logId: string): Promise<Log> {
        return await LogRepo.getById(logId);
    }

    public async writeLog (log: Log): Promise<Log> {
        return  null;
    }

    public async updateLog (log: Log): Promise<Log> {
        return null;
    }

    public async deleteLog (log: Log): Promise<void> {
        return null;
    }
}

export const logService = new LogService();