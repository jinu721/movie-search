import api from './api';
import type { Movie, MovieDetails } from '@/types';

export const movieService = {
    searchMovies: async (query: string, page: number = 1): Promise<{ result: Movie[]; pagination: { page: number; totalPages: number; totalResults: number } }> => {
        const response = await api.get<any>(`/movies/search`, {
            params: { query, page }
        });
        return response.data.data;
    },

    getMovie: async (id: string): Promise<MovieDetails> => {
        const response = await api.get<any>(`/movies/${id}`);
        return response.data.data;
    },

    getFavorites: async (page: number = 1, limit: number = 10): Promise<{ result: Movie[]; pagination: { page: number; totalPages: number; totalResults: number } }> => {
        const response = await api.get('/movies/favorites', {
            params: { page, limit }
        });
        return response.data.data;
    },

    addFavorite: async (movieId: string): Promise<void> => {
        await api.post('/movies/favorites', { movieId });
    },

    removeFavorite: async (movieId: string): Promise<void> => {
        await api.delete(`/movies/favorites/${movieId}`);
    },
};
