/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SignRequest = {
    properties: {
        signerAccountId: {
            type: 'string',
            isRequired: true,
        },
        txHash: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
    },
} as const;
