import React, { createContext, useContext, useEffect, useState } from 'react';
import { movieService } from '@/services/movie.service';
import type { Movie } from '@/types';

interface FavoritesContextType {
    favorites: Movie[];
    isLoading: boolean;
    addFavorite: (movie: Movie) => Promise<void>;
    removeFavorite: (movieId: string | number) => Promise<void>;
    isFavorite: (movieId: string | number) => boolean;
    refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            // Fetch large batch for checking 'isFavorite' globally
            const data = await movieService.getFavorites(1, 1000);
            setFavorites(data.result);
        } catch (error) {
            console.error("Failed to load favorites", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const addFavorite = async (movie: Movie) => {
        // Optimistic update
        const previousFavorites = [...favorites];
        setFavorites((prev) => [...prev, movie]);

        try {
            await movieService.addFavorite(movie.imdbID);
            // Sync with backend to ensure data consistency
            await fetchFavorites();
        } catch (error) {
            // Revert on error
            setFavorites(previousFavorites);
            console.error("Failed to add favorite", error);
        }
    };

    const removeFavorite = async (movieId: string | number) => {
        const idStr = movieId.toString();
        // Optimistic update
        const previousFavorites = [...favorites];
        setFavorites((prev) => prev.filter(m => m.imdbID !== idStr));

        try {
            await movieService.removeFavorite(idStr);
            // Sync with backend to ensure data consistency
            await fetchFavorites();
        } catch (error) {
            setFavorites(previousFavorites);
            console.error("Failed to remove favorite", error);
        }
    };

    const isFavorite = (movieId: string | number) => {
        return favorites.some(m => m.imdbID === movieId.toString());
    };

    return (
        <FavoritesContext.Provider value={{ favorites, isLoading, addFavorite, removeFavorite, isFavorite, refreshFavorites: fetchFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
