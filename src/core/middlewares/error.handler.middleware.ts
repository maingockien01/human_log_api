import { ApiError, InternalError } from '../helpers/ApiError';

export const errorHandler = (error: Error, req, res, next) => {
    if (error instanceof ApiError) {
        error.handle(res);
    } else {
        //Log error for later resolve
        console.error(error.message);
        const defaultError = new InternalError();
        defaultError.handle(res);
    }
}