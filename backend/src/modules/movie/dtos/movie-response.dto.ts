export class MovieResponseDTO {
    constructor(
        public readonly imdbID: string,
        public readonly title: string,
        public readonly year: string,
        public readonly type: string,
        public readonly poster: string,
        // Optional full details
        public readonly plot?: string,
        public readonly director?: string,
        public readonly actors?: string,
        public readonly genre?: string,
        public readonly runtime?: string,
        public readonly imdbRating?: string
    ) { }

    static fromPreview(omdbMovie: {
        imdbID: string;
        Title: string;
        Year: string;
        Type: string;
        Poster: string;
    }): MovieResponseDTO {
        return new MovieResponseDTO(
            omdbMovie.imdbID,
            omdbMovie.Title,
            omdbMovie.Year,
            omdbMovie.Type,
            omdbMovie.Poster
        );
    }

    static from(omdbMovie: {
        imdbID: string;
        Title: string;
        Year: string;
        Type: string;
        Poster: string;
        Plot?: string;
        Director?: string;
        Actors?: string;
        Genre?: string;
        Runtime?: string;
        imdbRating?: string;
    }): MovieResponseDTO {
        return new MovieResponseDTO(
            omdbMovie.imdbID,
            omdbMovie.Title,
            omdbMovie.Year,
            omdbMovie.Type,
            omdbMovie.Poster,
            omdbMovie.Plot,
            omdbMovie.Director,
            omdbMovie.Actors,
            omdbMovie.Genre,
            omdbMovie.Runtime,
            omdbMovie.imdbRating
        );
    }
}
