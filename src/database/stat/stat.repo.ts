import { statModel } from './stat.model';
import { Stat } from '../../models';

export class StatRepo {
    public static async getById (id: string): Promise<Stat | null> {
        return statModel.findById({_id: id}).lean<Stat>().exec();
    }

    public static async write (stat: Stat): Promise<Stat> {
        return (await statModel.create(stat)).toObject();
    }

    public static async delete (id: string): Promise<void> {
        let result = await statModel.deleteOne({_id: id});
        console.log(result);
    }
}