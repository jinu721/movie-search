import { MovieResponseDTO } from '../dtos';
import { Favourite } from './favourites-repository.interface';
import { PaginatedResponse } from '@shared/types';

export interface IMovieService {
    searchMovies(query: string, page: number): Promise<PaginatedResponse<MovieResponseDTO>>;
    getMovieById(imdbId: string): Promise<MovieResponseDTO | null>;
    addFavourite(userId: string, movieId: string): Promise<Favourite>;
    removeFavourite(userId: string, movieId: string): Promise<void>;
    getFavourites(userId: string): Promise<Favourite[]>;
}
