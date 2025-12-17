export const Messages = {
    AUTH: {
        REGISTER_SUCCESS: 'User registered successfully',
        LOGIN_SUCCESS: 'Login successful',
        INVALID_CREDENTIALS: 'Invalid email or password',
        USER_ALREADY_EXISTS: 'User with this email already exists',
        UNAUTHORIZED: 'Unauthorized access',
        TOKEN_REQUIRED: 'Authentication token is required',
        INVALID_TOKEN: 'Invalid or expired token',
    },
    USER: {
        NOT_FOUND: 'User not found',
        UPDATED_SUCCESS: 'User updated successfully',
    },
    MOVIE: {
        SEARCH_SUCCESS: 'Movies retrieved successfully',
        SEARCH_FAILED: 'Failed to search movies',
        FAVOURITE_ADDED: 'Movie added to favourites',
        FAVOURITE_REMOVED: 'Movie removed from favourites',
        FAVOURITES_RETRIEVED: 'Favourites retrieved successfully',
        ALREADY_IN_FAVOURITES: 'Movie is already in favourites',
        NOT_IN_FAVOURITES: 'Movie is not in favourites',
    },
    VALIDATION: {
        INVALID_EMAIL: 'Invalid email format',
        PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
        PASSWORD_REQUIRED: 'Password is required',
        EMAIL_REQUIRED: 'Email is required',
        QUERY_REQUIRED: 'Search query is required',
        MOVIE_ID_REQUIRED: 'Movie ID is required',
    },
    GENERAL: {
        INTERNAL_ERROR: 'Internal server error',
        NOT_FOUND: 'Resource not found',
        BAD_REQUEST: 'Bad request',
    },
};
