import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@shared/constants';
import { SuccessResponse } from '@shared/types';


export class AppError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly errors?: string[]
    ) {
        super(message);
        this.name = 'AppError';
        Error.captureStackTrace(this, this.constructor);
    }
}

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const sendSuccess = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T
): void => {
    const response: SuccessResponse<T> = {
        success: true,
        message,
        data,
    };
    res.status(statusCode).json(response);
};

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    } else {
        console.error('Unexpected Error:', err);

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
