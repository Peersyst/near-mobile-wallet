/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateUserRequest = {
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
        },
        password: {
            type: 'string',
            description: `at least 8 characters long, 1 uppercase & 1 lowercase letter, 1 number, 1 special character`,
            isRequired: true,
            pattern: '(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\W_]).*',
        },
    },
} as const;