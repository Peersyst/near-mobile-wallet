/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateSignerRequest = {
    properties: {
        network: {
            type: 'Enum',
            isRequired: true,
        },
        transactions: {
            type: 'array',
            contains: {
                type: 'one-of',
                contains: [{
                    type: 'SignerTransactionDto',
                }],
            },
            isRequired: true,
        },
        dAppMetadata: {
            type: 'DAppMetadatRequest',
        },
    },
} as const;