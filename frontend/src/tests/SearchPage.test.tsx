import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { SearchPage } from '../pages/SearchPage';
import { movieService } from '../services/movie.service';
import { BrowserRouter } from 'react-router-dom';
import * as FavoritesContextModule from '../context/FavoritesContext';

vi.mock('../services/movie.service', () => ({
    movieService: {
        searchMovies: vi.fn(),
        getMovie: vi.fn(),
    }
}));

vi.mock('../context/FavoritesContext', () => ({
    useFavorites: vi.fn(),
    FavoritesProvider: ({ children }: any) => <div>{children}</div>
}));

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual as any,
        useNavigate: () => mockUsedNavigate,
    };
});

describe('SearchPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (FavoritesContextModule.useFavorites as any).mockReturnValue({
            isFavorite: vi.fn().mockReturnValue(false),
            addFavorite: vi.fn(),
            removeFavorite: vi.fn(),
            favorites: [],
        });
    });

    it('renders search input and initial state', () => {
        render(
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/Type a movie title/i)).toBeInTheDocument();
        expect(screen.getByText(/Find Your Favorite/i)).toBeInTheDocument();
    });

    it('calls searchMovies when query is entered (debounced)', async () => {
        const mockResult = {
            result: [
                { imdbID: 'tt1', title: 'Batman', year: '2022', poster: 'url', type: 'movie' }
            ],
            pagination: { page: 1, totalResults: 10, totalPages: 1 }
        };
        (movieService.searchMovies as any).mockResolvedValue(mockResult);

        render(
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText(/Type a movie title/i);
        fireEvent.change(input, { target: { value: 'Batman' } });

        // Wait for debounce and effect
        await waitFor(() => {
            expect(movieService.searchMovies).toHaveBeenCalledWith('Batman', 1);
        }, { timeout: 1000 });

        expect(screen.getByText('Batman')).toBeInTheDocument();
    });

    it('displays error message on fetch failure', async () => {
        (movieService.searchMovies as any).mockRejectedValue(new Error('Network error'));

        render(
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText(/Type a movie title/i);
        fireEvent.change(input, { target: { value: 'Error' } });

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch movies/i)).toBeInTheDocument();
        });
    });
});
