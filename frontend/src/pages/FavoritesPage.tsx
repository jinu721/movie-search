import { useEffect, useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { movieService } from '@/services/movie.service';
import { MovieCard } from '@/components/feature/MovieCard';
import { MovieDetailModal } from '@/components/feature/MovieDetailModal';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { Skeleton } from '@/components/ui/skeleton';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Heart } from 'lucide-react';
import type { Movie, MovieDetails } from '@/types';

export function FavoritesPage() {
    const { removeFavorite, refreshFavorites } = useFavorites();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [movieToRemove, setMovieToRemove] = useState<Movie | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const fetchFavoritesList = async () => {
        setIsLoading(true);
        try {
            const data = await movieService.getFavorites(page, 10);
            setMovies(data.result);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            console.error("Failed to load favorites page", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFavoritesList();
    }, [page]); 

    const handleRemove = async (movie: Movie) => {
        setMovieToRemove(movie);
        setIsConfirmOpen(true);
    };

    const confirmRemove = async () => {
        if (!movieToRemove) return;
        
        await removeFavorite(movieToRemove.imdbID);
        await refreshFavorites(); 
        fetchFavoritesList();
        
        setIsConfirmOpen(false);
        setMovieToRemove(null);
    };

    const handleView = async (movie: Movie) => {
        try {
            const details = await movieService.getMovie(movie.imdbID);
            setSelectedMovie(details);
            setIsModalOpen(true);
        } catch (e) {
            console.error("Failed to load details", e);
        }
    };

    if (isLoading && movies.length === 0) {
        return (
            <div className="space-y-6 container mx-auto py-8">
                <h1 className="text-3xl font-bold tracking-tight">Your Favorites</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="aspect-[2/3] w-full rounded-xl" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in container mx-auto py-8 px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Heart className="h-8 w-8 text-red-600 fill-red-600" />
                Your Favorites
            </h1>

            {movies.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                isFavorite={true}
                                onToggleFavorite={() => handleRemove(movie)}
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
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center">
                    <Heart className="h-16 w-16 mb-4 opacity-20" />
                    <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                    <p className="max-w-md">
                        Start searching for movies and add them to your collection.
                    </p>
                </div>
            )}

            <MovieDetailModal
                movie={selectedMovie}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent className="bg-gray-900 border-gray-800">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Remove from favorites?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            Are you sure you want to remove "{movieToRemove?.title}" from your favorites? 
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={confirmRemove}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}