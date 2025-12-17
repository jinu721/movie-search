import { PaginatedResponse } from '@shared/types';

// Favourite Domain Object
export interface Favourite {
    imdbID: string;
    title: string;
    year: string;
    type: string;
    poster: string;
    addedAt?: Date;
}

export interface FavouriteInput {
    imdbID: string;
    title: string;
    year: string;
    type: string;
    poster: string;
}

export interface IFavouritesRepository {
    addFavourite(userId: string, favourite: FavouriteInput): Promise<Favourite>;
    removeFavourite(userId: string, imdbID: string): Promise<boolean>;
    getFavourites(userId: string, page: number, limit: number): Promise<PaginatedResponse<Favourite>>;
    isFavourite(userId: string, imdbID: string): Promise<boolean>;
}
