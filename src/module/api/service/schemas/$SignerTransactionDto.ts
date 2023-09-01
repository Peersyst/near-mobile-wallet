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
                properties: {
                },
            },
            isRequired: true,
        },
    },
} as const;