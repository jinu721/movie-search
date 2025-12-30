"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const movie_service_1 = require("../../src/modules/movie/services/movie.service");
const dtos_1 = require("../../src/modules/movie/dtos");
describe('MovieService', () => {
    let movieService;
    let mockOMDBService;
    let mockFavouritesRepository;
    beforeEach(() => {
        mockOMDBService = {
            search: jest.fn(),
            getById: jest.fn(),
        };
        mockFavouritesRepository = {
            addFavourite: jest.fn(),
            removeFavourite: jest.fn(),
            getFavourites: jest.fn(),
            isFavourite: jest.fn(),
        };
        movieService = new movie_service_1.MovieService(mockOMDBService, mockFavouritesRepository);
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
            expect(result.result[0]).toBeInstanceOf(dtos_1.MovieResponseDTO);
            expect(result.pagination.totalPages).toBe(10);
        });
    });
    describe('getFavourites', () => {
        it('should return paginated favourites from repository', async () => {
            const mockRepoResponse = {
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
//# sourceMappingURL=movie.service.test.js.map