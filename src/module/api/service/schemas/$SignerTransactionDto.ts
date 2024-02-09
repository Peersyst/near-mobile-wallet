/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SignerTransactionDto = {
    properties: {
        signerId: {
            type: 'string',
        },
        receiverId: {
            type: 'string',
        },
        actions: {
            type: 'array',
            contains: {
                type: 'dictionary',
                contains: {
                    properties: {
                    },
                },
            },
            isRequired: true,
        },
    },
} as const;
