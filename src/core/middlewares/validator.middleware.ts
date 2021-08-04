import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer'
import { Request } from 'express';
import { BadRequestError } from '../helpers/ApiError';
import { sanitize } from 'class-sanitizer';

export enum VALIDATION_SOURCE {
    HEADER = 'headers',
    BODY = 'body',
}

export function dtoValidateMiddleware (type: any, dtoSection = VALIDATION_SOURCE.BODY, skipMissingProperties = false) {
    return (req: Request, res, next) => {
        const dtoObj = plainToClass(type, req[dtoSection]);
        validate(dtoObj, {skipMissingProperties}).then(
            (errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    next(new BadRequestError(message));
                } else {
                    sanitize(dtoObj)
                    req.body = dtoObj;
                    next()
                }
            }
        )
    }
}