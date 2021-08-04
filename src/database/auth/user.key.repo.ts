import { UserKey } from "../../models";
import { userKeyModel } from './user.key.model';

export class UserKeyRepo {
    public static async findByKey (key: string): Promise<UserKey | null> {
        return userKeyModel.findOne({apiKey: key}).lean<UserKey>().exec();
    }
}