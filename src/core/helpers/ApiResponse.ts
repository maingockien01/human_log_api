import { Response } from 'express';
import { BadRequestError } from './ApiError';
import {
    getResponseFormater,
    ResponseFormater,
    jsonFormater,
} from './ResponseFormater';

enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

const defaultFormater: ResponseFormater = jsonFormater;

export abstract class ApiResponse {
    constructor(
        protected status: ResponseStatus,
        protected message: string,
        protected formaterQueue = [defaultFormater],
    ) {}

    /*
     * @function        send
     * @desc            given the Response object, create Response with given data this object contains
     *
     * @params          res {Response}  response object from controller
     *
     * @return          Response object filled with header status, data and other data needed for the response
     */
    public send(res: Response): Response {
        return this.prepare(res, this);
    }

    /*
     * @func            prepare
     * @desc            prepare response with given status and data respone in formated form
     *                  the content type will be formated regard to config type (default - environment variable)
     *                                                         then accepteable type in the request
     * @params          res {Response} response object
     * @params          response {extends ApiResponse} the response data in response body
     *
     * @return          response object with given status in header and jsonified T's data in body
     */
    protected prepare<T extends ApiResponse>(
        res: Response,
        response: T,
    ): Response {
        this.setContentType(res, this.formaterQueue);
        console.log(res.get('Content-Type'))
        const formater = getResponseFormater(
            res.get('Content-Type'),
            this.formaterQueue,
        );
        const body = formater.format(ApiResponse.sanitize(response));

        return res.status(this.status).send(body);
    }

    protected setContentType(
        res: Response,
        formaterQueue: ResponseFormater[],
    ): Response {
        const formatCallbacks = this.getFormatCallbacks(
            res,
            formaterQueue,
            (formater: ResponseFormater) => {
                res.type(formater.getContentType());
            },
        );

        return res.format(formatCallbacks);
    }

    /*
     * @func            getFormatCallbacks
     * @desc            construct the callback object
     *                  matching available content type
     *                  read more: https://expressjs.com/en/api.html#res.format
     * @params          res {Response} - express response object
     * @params          formaterQueue {ResposneFormater[]} available formateres sorted in queue
     *                      if no accept type specified in req, the first formater in queue will be selected
     * @params          callback {(ResponseFormater) => void} what the format function will call on matching type
     *
     * @return          return callback object with pairs of type: function
     */
    private getFormatCallbacks(
        res: Response,
        formaterQueue: ResponseFormater[],
        callback: (formater: ResponseFormater) => void,
    ) {
        const formatCallbacks = {};
        formaterQueue.map((formater) => {
            formatCallbacks[formater.getContentType()] = () => {
                callback(formater);
            };
        });

        formatCallbacks['default'] = () => {
            throw new BadRequestError(
                'Accept-type does not match any available response content type',
            );
        };

        console.log(formatCallbacks);
        return formatCallbacks;
    }

    /*
     * @func            sanitize
     * @desc            prepare object for the response
     *                  remove all undefined/null fields and functions
     * @params          T {extends ApiResponse} subclass of ApiResponse contatining data for response.
     *
     * @returns         an object contains: statusCode, data (if subclass has the field)
     */
    private static sanitize<T extends ApiResponse>(response: T): T {
        //Create a clone copy of response's fields
        const clone: T = {} as T;
        Object.assign(clone, response);
        //Remove unneeded fields
        delete clone.status;
        delete clone.formaterQueue;
        for (const i in clone) {
            if (typeof clone[i] === 'undefined') delete clone[i];
        }

        return clone;
    }
}

export class SuccessResponse<T> extends ApiResponse {
    constructor(
        message: string,
        private data: T,
        formaterQueue = [defaultFormater],
    ) {
        super(ResponseStatus.SUCCESS, message, formaterQueue);
    }

    send(res: Response): Response {
        return super.prepare<SuccessResponse<T>>(res, this);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error', formaterQueue = [defaultFormater]) {
        super(ResponseStatus.INTERNAL_ERROR, message, formaterQueue);
    }
}

export class NotFoundResponse extends ApiResponse {
    private url: string | undefined;
    constructor(message = 'Not Found', formaterQueue = [defaultFormater]) {
        super(ResponseStatus.NOT_FOUND, message, formaterQueue);
    }

    send(res: Response) {
        this.url = res.req?.originalUrl;
        return super.prepare<NotFoundResponse>(res, this);
    }
}

export class AuthFailureResponse extends ApiResponse {
    constructor(
        message = 'Authentication Failure',
        formaterQueue = [defaultFormater],
    ) {
        super(ResponseStatus.UNAUTHORIZED, message, formaterQueue);
    }
}

export class ForbiddenReponse extends ApiResponse {
    constructor(message = 'Forbidden', formaterQueue = [defaultFormater]) {
        super(ResponseStatus.FORBIDDEN, message, formaterQueue);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Request') {
        super(ResponseStatus.BAD_REQUEST, message);
    }
}
