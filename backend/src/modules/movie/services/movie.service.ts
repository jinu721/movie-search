import { injectable, inject } from 'inversify';
import { IMovieService, IOMDBService, IFavouritesRepository } from '../interfaces';
import { MovieResponseDTO } from '../dtos';
import { TYPES } from '@di/types';
import { AppError } from '@shared/utils';
import { HttpStatus } from '@shared/constants';
import { Favourite } from '../interfaces/favourites-repository.interface';
import { PaginatedResponse } from '@shared/types';

@injectable()
export class MovieService implements IMovieService {
    constructor(
        @inject(TYPES.OMDBService) private omdbService: IOMDBService,
        @inject(TYPES.FavouritesRepository) private favouritesRepository: IFavouritesRepository
    ) { }

    async searchMovies(query: string, page: number): Promise<PaginatedResponse<MovieResponseDTO>> {
        const omdbResponse = await this.omdbService.search(query, page);
        const mappedResults = omdbResponse.result.map(MovieResponseDTO.fromPreview);
        return {
            result: mappedResults,
            pagination: omdbResponse.pagination
        };
    }

    async getMovieById(imdbId: string): Promise<MovieResponseDTO | null> {
        const movie = await this.omdbService.getById(imdbId);
        if (!movie) return null;
        return MovieResponseDTO.from(movie);
    }

    async addFavourite(userId: string, imdbID: string): Promise<Favourite> {
        // userId arg kept for interface compatibility but unused
        const exists = await this.favouritesRepository.isFavourite(userId, imdbID);
        if (exists) {
            throw new AppError(HttpStatus.CONFLICT, 'Movie already in favourites');
        }

        const movieDetails = await this.omdbService.getById(imdbID);
        if (!movieDetails) {
            throw new AppError(HttpStatus.NOT_FOUND, 'Movie not found');
        }

        return await this.favouritesRepository.addFavourite(userId, {
            imdbID: movieDetails.imdbID,
            title: movieDetails.Title,
            year: movieDetails.Year,
            type: movieDetails.Type,
            poster: movieDetails.Poster
        });
    }

    async removeFavourite(userId: string, imdbID: string): Promise<void> {
        const success = await this.favouritesRepository.removeFavourite(userId, imdbID);
        if (!success) {
            throw new AppError(HttpStatus.NOT_FOUND, 'Favourite not found');
        }
    }

    async getFavourites(userId: string, page: number, limit: number): Promise<PaginatedResponse<Favourite>> {
        return await this.favouritesRepository.getFavourites(userId, page, limit);
    }
}
