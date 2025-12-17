import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '@/services/movie.service';
import { MovieCard } from '@/components/feature/MovieCard';
import { MovieDetailModal } from '@/components/feature/MovieDetailModal';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import type { Movie, MovieDetails } from '@/types';

function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query') || '';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);

    const [query, setQuery] = useState(queryParam);
    const debouncedQuery = useDebounceValue(query, 500);
    const [page, setPage] = useState(pageParam);

    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchMovies = async () => {
            if (!debouncedQuery.trim()) {
                setMovies([]);
                setTotalPages(0);
                setSearchParams({}, { replace: true });
                return;
            }

            // Update URL
            setSearchParams({ query: debouncedQuery, page: page.toString() }, { replace: true });

            setIsLoading(true);
            setError(null);

            try {
                const data = await movieService.searchMovies(debouncedQuery, page);
                setMovies(data.result);
                // OMDB returns totalResults, not totalPages usually directly in "Search" array but our backend maps it.
                // Backend: totalPages = ceil(totalResults / 10).
                setTotalPages(data.pagination.totalPages);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch movies. Please try again.');
                setMovies([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [debouncedQuery, page, setSearchParams]);

    // Reset page when query changes
    useEffect(() => {
        setPage(1);
    }, [debouncedQuery]);

    const handleToggleFavorite = async (movieToToggle: Movie) => {
        if (!movieToToggle) return;
        try {
            if (isFavorite(movieToToggle.imdbID)) {
                await removeFavorite(movieToToggle.imdbID);
            } else {
                await addFavorite(movieToToggle);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleView = async (movie: Movie) => {
        try {
            // Optimistically open modal with summary data if needed, or wait for full load
            // For better UX, we fetch then open, or open with loading state.
            // Let's fetch then open for simplicity as we need MovieDetails type
            const details = await movieService.getMovie(movie.imdbID);
            setSelectedMovie(details);
            setIsModalOpen(true);
        } catch (e) {
            console.error("Failed to load details", e);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in container mx-auto py-8 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8">
                <div className="w-full max-w-2xl space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Find Your Favorite <span className="text-primary">Movies</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Search for a movie logic using the new pagination system.
                    </p>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Type a movie title..."
                            className="pl-10 h-12 text-lg bg-background"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <Skeleton key={i} className="aspect-[2/3] w-full rounded-xl" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center p-12 text-destructive">
                            <p>{error}</p>
                        </div>
                    ) : movies.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {movies.map((movie) => (
                                    <MovieCard
                                        key={movie.imdbID}
                                        movie={movie}
                                        isFavorite={isFavorite(movie.imdbID)}
                                        onToggleFavorite={() => handleToggleFavorite(movie)}
                                        onView={() => handleView(movie)}
                                    />
                                ))}
                            </div>
                            <PaginationControls
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </>
                    ) : (
                        debouncedQuery && !isLoading && (
                            <div className="text-center p-12 text-muted-foreground">
                                <p>No movie found for "{debouncedQuery}"</p>
                            </div>
                        )
                    )}
                </div>
            </div>

            <MovieDetailModal
                movie={selectedMovie}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
