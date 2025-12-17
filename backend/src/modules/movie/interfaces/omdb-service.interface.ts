import { PaginatedResponse } from '@shared/types';

export interface OMDBMoviePreview {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export interface OMDBMovieFull extends OMDBMoviePreview {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface OMDBSearchResponse {
    Search: OMDBMoviePreview[];
    totalResults: string;
    Response: string;
}

export interface IOMDBService {
    search(query: string, page: number): Promise<PaginatedResponse<OMDBMoviePreview>>;
    getById(imdbId: string): Promise<OMDBMovieFull | null>;
}
