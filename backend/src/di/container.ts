import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

// Core
import { App } from '../app';

// Movie Module
import { MovieController } from '@modules/movie/controllers/movie.controller';
import { MovieService } from '@modules/movie/services/movie.service';
import { MovieRouter } from '@modules/movie/routes';
import { IMovieService } from '@modules/movie/interfaces/movie-service.interface';
import { OMDBService } from '@modules/movie/services/omdb.service';
import { IOMDBService } from '@modules/movie/interfaces/omdb-service.interface';
import { FavouritesRepository } from '@modules/movie/repositories/favourites.repository';
import { IFavouritesRepository } from '@modules/movie/interfaces/favourites-repository.interface';

export const createContainer = (): Container => {
    const container = new Container();

    // Core Bindings
    container.bind<App>(TYPES.App).to(App).inSingletonScope();

    // Movie Module Bindings
    container.bind<MovieController>(TYPES.MovieController).to(MovieController);
    container.bind<IMovieService>(TYPES.MovieService).to(MovieService);
    container.bind<MovieRouter>(TYPES.MovieRouter).to(MovieRouter).inSingletonScope();
    container.bind<IOMDBService>(TYPES.OMDBService).to(OMDBService);
    container.bind<IFavouritesRepository>(TYPES.FavouritesRepository).to(FavouritesRepository).inSingletonScope();

    return container;
};
