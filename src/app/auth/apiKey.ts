import express from 'express';
import { VALIDATION_SOURCE } from '../../core/middlewares';
import { dtoValidateMiddleware } from '../../core/middlewares';
import { ApiKeyDTO } from './apiKey.dto';
import { UserKeyRepo } from '../../database/auth/user.key.repo';
import { AuthFailureError } from '../../core/helpers/ApiError';

const router = express.Router()

export default router.use(
    dtoValidateMiddleware(ApiKeyDTO, VALIDATION_SOURCE.HEADER),
    async (req, res, next) => {
        const apiKey = req.headers['x-api-key'].toString();

        const userKey = await UserKeyRepo.findByKey(apiKey);

        if (userKey) {
            //@ts-ignore
            req.userKey = userKey;
            console.log(userKey);
        } else {
            next(new AuthFailureError('ApiKey is invalid'));
        }

        return next();
    }
);