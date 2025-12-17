export interface ValidationResult<T> {
    isValid: boolean;
    errors: string[];
    data?: T;
}

export interface PaginatedResponse<T> {
    result: T[];
    pagination: {
        page: number;
        totalResults: number;
        totalPages: number;
    };
}

export interface SuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

export interface ErrorResponse {
    success: false;
    message: string;
    errors?: string[];
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface JwtPayload {
    userId: string;
    email: string;
}

export interface AuthenticatedRequest {
    user: JwtPayload;
}
