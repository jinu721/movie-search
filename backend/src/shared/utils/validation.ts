import { ValidationResult } from '@shared/types';

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
};

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
