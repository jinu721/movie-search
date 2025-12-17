import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Calendar, Clock, Globe, Award } from 'lucide-react';
import type { MovieDetails } from '@/types';

interface MovieDetailModalProps {
    movie: MovieDetails | null;
    isOpen: boolean;
    onClose: () => void;
}

export function MovieDetailModal({ movie, isOpen, onClose }: MovieDetailModalProps) {
    if (!movie) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden bg-card border-border/50 shadow-2xl">
                <ScrollArea className="max-h-[85vh]">
                    <div className="relative h-64 md:h-80 w-full overflow-hidden">
                        <img 
                            src={movie.poster !== 'N/A' ? movie.poster : 'https://via.placeholder.com/1200x500?text=No+Image'} 
                            alt={movie.title} 
                            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                        
                        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row gap-6 items-end">
                            <img 
                                src={movie.poster !== 'N/A' ? movie.poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
                                alt={movie.title} 
                                className="w-32 md:w-48 rounded-lg shadow-xl border-2 border-primary/20 bg-black"
                            />
                            <div className="flex-1 pb-2">
                                <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                                    {movie.type.toUpperCase()}
                                </Badge>
                                <DialogTitle className="text-3xl md:text-4xl font-bold tracking-tight text-foreground shadow-black drop-shadow-lg leading-tight mb-2">
                                    {movie.title}
                                </DialogTitle>
                                <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground items-center">
                                    {movie.year && (
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            <span>{movie.year}</span>
                                        </div>
                                    )}
                                    {movie.runtime && (
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span>{movie.runtime}</span>
                                        </div>
                                    )}
                                    {movie.imdbRating && (
                                        <div className="flex items-center gap-1.5">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-foreground">{movie.imdbRating}</span>
                                            <span className="text-xs">/10</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        {/* Plot */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">Plot</h3>
                            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                                {movie.plot}
                            </DialogDescription>
                        </div>

                        {/* Grid Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <DetailItem label="Director" value={movie.director} />
                                <DetailItem label="Writers" value={movie.writer} />
                                <DetailItem label="Actors" value={movie.actors} />
                                <DetailItem label="Genre" value={movie.genre} />
                            </div>
                            <div className="space-y-4">
                                <DetailItem label="Language" value={movie.language} />
                                <DetailItem label="Country" value={movie.country} />
                                {movie.awards && movie.awards !== 'N/A' && (
                                    <div className="flex gap-3 items-start">
                                        <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-sm font-medium text-foreground block mb-0.5">Awards</span>
                                            <span className="text-sm text-muted-foreground">{movie.awards}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ratings */}
                        {movie.ratings && movie.ratings.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Ratings</h3>
                                <div className="flex flex-wrap gap-3">
                                    {movie.ratings.map((rating, idx) => (
                                        <Badge key={idx} variant="secondary" className="px-3 py-1.5 gap-2">
                                            <span className="opacity-70">{rating.source}:</span>
                                            <span className="font-semibold">{rating.value}</span>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
    if (!value || value === 'N/A') return null;
    return (
        <div>
            <span className="text-sm font-medium text-foreground block mb-0.5">{label}</span>
            <span className="text-sm text-muted-foreground">{value}</span>
        </div>
    );
}
