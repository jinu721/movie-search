import { Router } from 'express';
import { injectable, inject } from 'inversify';
import { MovieController } from '../controllers';
import { TYPES } from '@di/types';

@injectable()
export class MovieRouter {
    public router: Router;

    constructor(
        @inject(TYPES.MovieController) private movieController: MovieController
    ) {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/search', this.movieController.searchMovies);

        this.router.get('/favorites', this.movieController.getFavourites);
        this.router.post('/favorites', this.movieController.addFavourite);
        this.router.delete('/favorites/:movieId', this.movieController.removeFavourite);

        this.router.get('/:id', this.movieController.getMovieById);
    }
}
