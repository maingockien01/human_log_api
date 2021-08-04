import express, { response } from 'express';
import { UserKey } from '../../models';
import { SuccessResponse } from '../../core/helpers/ApiResponse';
import { dtoValidateMiddleware, VALIDATION_SOURCE } from '../../core/middlewares';
import { CreateLogDTO, DeleteLogDTO, GetLogById, UpdateLogDTO } from './dto.log';
import { logService } from './service.log';

export const router = express.Router();

router.get('/id/:id', async (req, res, next) => {
    const dto = {_id: req.params.id};

    const log = await logService.getLog(dto._id);

    const response = new SuccessResponse ('Log is found', log);

    response.send(res);
})

router.get('/time', async (req, res, next) => {

    //@ts-ignore
    const userKey: UserKey =  req.userKey;

    const log = await logService.getLogs(userKey.userId);

    const response = new SuccessResponse ('Log is found', log);

    response.send(res);
})

router.get('/time/:from', async (req, res, next) => {
   //@ts-ignore
   const userKey: UserKey =  req.userKey;

   const from: Date = new Date(+req.params.from);

   const log = await logService.getLogs(userKey.userId, from);

   const response = new SuccessResponse ('Log is found', log);

   response.send(res);
})

router.get('/time/:from/:to', async (req, res, next) => {
//@ts-ignore
const userKey: UserKey =  req.userKey;

const from: Date = new Date(+req.params.from);
const to: Date = new Date(+req.params.to);

const log = await logService.getLogs(userKey.userId, from, to);

const response = new SuccessResponse ('Log is found', log);

response.send(res);
})

//Insert log
router.post('/', dtoValidateMiddleware(CreateLogDTO), async (req, res, next) => {
    const dto = req.body
    const createdLog = await logService.writeLog(dto);

    const response = new SuccessResponse('Log is inserted!', createdLog);
    response.send(res);
})

//Update log
router.put('/', dtoValidateMiddleware(UpdateLogDTO), async (req, res, next) => {
    const dto = req.body;

    const updatedLog = await logService.updateLog(dto);

    const response = new SuccessResponse('Log is updated', updatedLog);

    response.send(res);
})

//Delete log
router.delete('/', dtoValidateMiddleware(DeleteLogDTO), async (req, res, next) => {
    const dto = req.body;

    const updatedLog = await logService.deleteLog(dto);

    const response = new SuccessResponse('Log is updated', updatedLog);

    response.send(res);
})