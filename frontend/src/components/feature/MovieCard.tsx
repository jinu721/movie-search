import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Calendar } from 'lucide-react';
import type { Movie } from '@/types';

interface MovieCardProps {
    movie: Movie;
    isFavorite: boolean;
    onToggleFavorite: (movie: Movie) => void;
    onView: (movie: Movie) => void;
}

export function MovieCard({ movie, isFavorite, onToggleFavorite, onView }: MovieCardProps) {
    const [imgSrc, setImgSrc] = React.useState(
        movie.poster && movie.poster !== 'N/A'
            ? movie.poster
            : 'https://via.placeholder.com/500x750?text=No+Image'
    );

    return (
        <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-border/50 bg-card/50 flex flex-col h-full">
            <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                <img
                    src={imgSrc}
                    alt={movie.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={() => setImgSrc('https://via.placeholder.com/500x750?text=No+Image')}
                />

                <div className="absolute top-2 right-2 z-10">
                    <Button
                        variant="secondary"
                        size="icon"
                        className={`rounded-full h-10 w-10 shadow-lg backdrop-blur-sm transition-all duration-300 ${isFavorite
                                ? 'bg-red-500/90 text-white hover:bg-red-600 hover:scale-110'
                                : 'bg-black/50 text-white hover:bg-black/70 hover:scale-110'
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(movie);
                        }}
                    >
                        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                        <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
                    </Button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            </div>

            <CardContent className="p-4 flex-1 flex flex-col justify-end">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2" title={movie.title}>
                        {movie.title}
                    </h3>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-0.5 rounded-full">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-0.5 rounded-full">
                        <span className="capitalize">{movie.type}</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full mt-auto"
                    onClick={() => onView(movie)}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
}
