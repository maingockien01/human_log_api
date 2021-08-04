import { ValueType, Stat } from "../../models";
import '../index';
import { StatRepo } from "./stat.repo";

describe('Test stat model and repo', () => {
    let sampleStat: Stat = {
        name: 'location',
        valueType: ValueType.STRING,
    };

    let stat: Stat = null;

    it('Should write successfully', async () => {
        stat = await StatRepo.write(sampleStat);
        expect(stat).toBeDefined();
        expect(stat._id).toBeDefined();
    });

    it('Should get by Id successfully', async () => {
        let searchedStat = await StatRepo.getById(stat._id);
        expect(searchedStat).toBeDefined();
        expect(searchedStat.name).toBe(sampleStat.name);
    })

    it('Should delete', async () => {
        await StatRepo.delete(stat._id);
        let searchedStat = await StatRepo.getById(stat._id);
        expect(searchedStat).toBe(null);
    });

})

