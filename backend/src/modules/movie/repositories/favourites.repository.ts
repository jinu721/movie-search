import { injectable } from 'inversify';
import { IFavouritesRepository, FavouriteInput, Favourite } from '../interfaces';
import { PaginatedResponse } from '@shared/types';

@injectable()
export class FavouritesRepository implements IFavouritesRepository {
    private favourites: Favourite[] = [];

    async addFavourite(_userId: string, input: FavouriteInput): Promise<Favourite> {
        // Treat as global, ignore userId
        const newFav: Favourite = {
            imdbID: input.imdbID,
            title: input.title,
            year: input.year,
            type: input.type,
            poster: input.poster,
            addedAt: new Date()
        };
        this.favourites.push(newFav);
        return newFav;
    }

    async removeFavourite(_userId: string, imdbID: string): Promise<boolean> {
        const initialLength = this.favourites.length;
        this.favourites = this.favourites.filter(f => f.imdbID !== imdbID);
        return this.favourites.length < initialLength;
    }

    async getFavourites(_userId: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Favourite>> {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = this.favourites.slice(startIndex, endIndex);
        const totalResults = this.favourites.length;
        const totalPages = Math.ceil(totalResults / limit);

        return {
            result: results,
            pagination: {
                page,
                totalResults,
                totalPages
            }
        };
    }

    async isFavourite(_userId: string, imdbID: string): Promise<boolean> {
        return this.favourites.some(f => f.imdbID === imdbID);
    }
}
