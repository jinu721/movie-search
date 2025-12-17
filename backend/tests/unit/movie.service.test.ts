import 'reflect-metadata';
import { MovieService } from '../../src/modules/movie/services/movie.service';
import { IOMDBService, IFavouritesRepository } from '../../src/modules/movie/interfaces';
import { PaginatedResponse } from '../../src/shared/types';
import { MovieResponseDTO } from '../../src/modules/movie/dtos';

describe('MovieService', () => {
    let movieService: MovieService;
    let mockOMDBService: jest.Mocked<IOMDBService>;
    let mockFavouritesRepository: jest.Mocked<IFavouritesRepository>;

    beforeEach(() => {
        mockOMDBService = {
            search: jest.fn(),
            getById: jest.fn(),
        } as any;

        mockFavouritesRepository = {
            addFavourite: jest.fn(),
            removeFavourite: jest.fn(),
            getFavourites: jest.fn(),
            isFavourite: jest.fn(),
        } as any;

        movieService = new MovieService(mockOMDBService, mockFavouritesRepository);
    });

    describe('searchMovies', () => {
        it('should return paginated results from OMDB', async () => {
            const mockOMDBResponse = {
                result: [
                    { Title: 'Batman', Year: '2022', imdbID: 'tt123', Type: 'movie', Poster: 'url' }
                ],
                pagination: { page: 1, totalResults: 100, totalPages: 10 }
            };

            mockOMDBService.search.mockResolvedValue(mockOMDBResponse);

            const result = await movieService.searchMovies('Batman', 1);

            expect(mockOMDBService.search).toHaveBeenCalledWith('Batman', 1);
            expect(result.result).toHaveLength(1);
            expect(result.result[0]).toBeInstanceOf(MovieResponseDTO);
            expect(result.pagination.totalPages).toBe(10);
        });
    });

    describe('getFavourites', () => {
        it('should return paginated favourites from repository', async () => {
            const mockRepoResponse: PaginatedResponse<any> = {
                result: [{ imdbID: 'tt123', title: 'Fav' }],
                pagination: { page: 1, totalResults: 1, totalPages: 1 }
            };

            mockFavouritesRepository.getFavourites.mockResolvedValue(mockRepoResponse);

            const result = await movieService.getFavourites('user1', 1, 10);

            expect(mockFavouritesRepository.getFavourites).toHaveBeenCalledWith('user1', 1, 10);
            expect(result.result).toHaveLength(1);
            expect(result.pagination.totalResults).toBe(1);
        });
    });
});
