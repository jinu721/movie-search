import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { IMovieService } from '../interfaces';
import { MovieSearchRequestDTO } from '../dtos';
import { TYPES } from '@di/types';
import { asyncHandler, sendSuccess, AppError } from '@shared/utils';
import { HttpStatus, Messages } from '@shared/constants';

@injectable()
export class MovieController {
    constructor(
        @inject(TYPES.MovieService) private movieService: IMovieService
    ) { }

    searchMovies = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const dto = MovieSearchRequestDTO.from(req.query);
        const validation = dto.validate();

        if (!validation.isValid) {
            throw new AppError(HttpStatus.BAD_REQUEST, validation.errors.join(', '));
        }

        const result = await this.movieService.searchMovies(dto.query, dto.page);
        sendSuccess(res, HttpStatus.OK, Messages.MOVIE.SEARCH_SUCCESS, result);
    });

    getMovieById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        if (!id) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Movie ID is required');
        }

        const result = await this.movieService.getMovieById(id);
        if (!result) {
            throw new AppError(HttpStatus.NOT_FOUND, 'Movie not found');
        }

        sendSuccess(res, HttpStatus.OK, 'Movie details retrieved successfully', result);
    });

    addFavourite = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { movieId } = req.body;
        const userId = "global_user";

        if (!movieId) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Movie ID is required');
        }

        const result = await this.movieService.addFavourite(userId, movieId);

        sendSuccess(res, HttpStatus.CREATED, Messages.MOVIE.FAVOURITE_ADDED, result);
    });

    removeFavourite = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const movieId = req.params.movieId;
        const userId = "global_user";

        if (!movieId) {
            throw new AppError(
                HttpStatus.BAD_REQUEST,
                Messages.VALIDATION.MOVIE_ID_REQUIRED
            );
        }

        await this.movieService.removeFavourite(userId, movieId);

        sendSuccess(res, HttpStatus.OK, Messages.MOVIE.FAVOURITE_REMOVED, null);
    });

    getFavourites = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const userId = "global_user";
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

        const result = await this.movieService.getFavourites(userId, page, limit);

        sendSuccess(res, HttpStatus.OK, Messages.MOVIE.FAVOURITES_RETRIEVED, result);
    });
}
