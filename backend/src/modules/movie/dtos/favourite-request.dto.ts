import { ValidationResult } from '@shared/types';
import { createValidationResult } from '@shared/utils';
import { Messages } from '@shared/constants';

export class FavouriteRequestDTO {
    constructor(
        public readonly movieId: string,
        public readonly title: string,
        public readonly year: string,
        public readonly type: string,
        public readonly poster: string
    ) { }

    static from(body: Record<string, unknown>): FavouriteRequestDTO {
        return new FavouriteRequestDTO(
            body.movieId as string,
            body.title as string,
            body.year as string,
            body.type as string,
            body.poster as string
        );
    }

    validate(): ValidationResult<FavouriteRequestDTO> {
        const errors: string[] = [];

        if (!this.movieId) {
            errors.push(Messages.VALIDATION.MOVIE_ID_REQUIRED);
        }

        if (!this.title) {
            errors.push('Movie title is required');
        }

        return createValidationResult(
            errors.length === 0,
            errors,
            errors.length === 0 ? this : undefined
        );
    }
}
