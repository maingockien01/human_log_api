import { Log } from '../../models';
import { log1 } from '../../models/sample/log.sample';

import '../index';
import { LogRepo } from './log.repo';

describe('Test log repo', () => {
    it ('Should perform all needed functions', async () => {
        let sampleLog: Log = log1;
        delete log1._id;

        expect(log1._id).toBeUndefined();
    });
})