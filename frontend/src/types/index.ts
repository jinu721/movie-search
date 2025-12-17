export interface User {
    id: string;
    email: string;
    name: string;
    username?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
    username: string;
}

export interface Movie {
    imdbID: string;
    title: string;
    poster: string;
    type: string;
    year: string;
}


export interface MovieDetails {
    imdbID: string;
    title: string;
    year: string;
    type: string;
    poster: string;
    rated?: string;
    released?: string;
    runtime?: string;
    genre?: string;
    director?: string;
    writer?: string;
    actors?: string;
    plot?: string;
    language?: string;
    country?: string;
    awards?: string;
    ratings?: { source: string; value: string }[];
    metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    dvd?: string;
    boxOffice?: string;
    production?: string;
    website?: string;
    response?: string;
}
