import { ValidationResult } from '@shared/types';

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
};

/**
 * Create validation result
 */
export const createValidationResult = <T>(
    isValid: boolean,
    errors: string[],
    data?: T
): ValidationResult<T> => {
    return {
        isValid,
        errors,
        data,
    };
};
