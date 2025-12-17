import { ValidationResult } from '@shared/types';
import { createValidationResult } from '@shared/utils';
import { Messages } from '@shared/constants';

export class MovieSearchRequestDTO {
    constructor(
        public readonly query: string,
        public readonly page: number = 1,
        public readonly limit: number = 10
    ) { }

    static from(queryParams: Record<string, unknown>): MovieSearchRequestDTO {
        const query = queryParams.query as string;
        const page = queryParams.page ? parseInt(queryParams.page as string, 10) : 1;
        const limit = queryParams.limit ? parseInt(queryParams.limit as string, 10) : 10;

        return new MovieSearchRequestDTO(query, page, limit);
    }

    validate(): ValidationResult<MovieSearchRequestDTO> {
        const errors: string[] = [];

        if (!this.query || this.query.trim().length === 0) {
            errors.push(Messages.VALIDATION.QUERY_REQUIRED);
        }

        if (this.page < 1) {
            errors.push('Page must be greater than 0');
        }

        if (this.limit < 1 || this.limit > 100) {
            errors.push('Limit must be between 1 and 100');
        }

        return createValidationResult(
            errors.length === 0,
            errors,
            errors.length === 0 ? this : undefined
        );
    }
}
