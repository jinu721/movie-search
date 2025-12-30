import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { injectable, inject } from 'inversify';
import { env } from '@config/env';
import { errorHandler } from '@shared/utils';
import { TYPES } from '@di/types';
import { MovieRouter } from '@modules/movie/routes';

@injectable()
export class App {
    public app: Application;

    constructor(
        @inject(TYPES.MovieRouter) private movieRouter: MovieRouter
    ) {
        this.app = express();
    }

    public async init(): Promise<void> {
        this.app.use(cors({
            origin: env.FRONTEND_URL,
            credentials: true,
        }));
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use('/api/movies', this.movieRouter.router);


        this.app.use((_req, res) => {
            res.status(404).json({
                success: false,
                message: 'Resource not found',
            });
        });

        this.app.use(errorHandler);
    }
}
