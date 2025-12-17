import { injectable } from 'inversify';
import axios from 'axios';
import { IOMDBService, OMDBSearchResponse, OMDBMoviePreview, OMDBMovieFull } from '../interfaces';
import { env } from '@config/env';
import { AppError } from '@shared/utils';
import { HttpStatus, Messages } from '@shared/constants';
import { PaginatedResponse } from '@shared/types';

@injectable()
export class OMDBService implements IOMDBService {
    private readonly baseUrl = 'http://www.omdbapi.com/';

    async search(query: string, page: number): Promise<PaginatedResponse<OMDBMoviePreview>> {
        try {
            const response = await axios.get<OMDBSearchResponse>(this.baseUrl, {
                params: {
                    apikey: env.OMDB_API_KEY,
                    s: query,
                    page: page,
                },
            });

            if (response.data.Response === 'False') {
                return {
                    result: [],
                    pagination: {
                        page,
                        totalResults: 0,
                        totalPages: 0
                    }
                };
            }

            const totalResults = parseInt(response.data.totalResults, 10);
            return {
                result: response.data.Search,
                pagination: {
                    page,
                    totalResults,
                    totalPages: Math.ceil(totalResults / 10)
                }
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new AppError(
                    HttpStatus.BAD_GATEWAY,
                    Messages.MOVIE.SEARCH_FAILED
                );
            }
            throw error;
        }
    }

    async getById(imdbId: string): Promise<OMDBMovieFull | null> {
        try {
            const response = await axios.get<OMDBMovieFull>(this.baseUrl, {
                params: {
                    apikey: env.OMDB_API_KEY,
                    i: imdbId,
                    plot: 'full'
                },
            });

            if (response.data.Response === 'False') {
                return null;
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
