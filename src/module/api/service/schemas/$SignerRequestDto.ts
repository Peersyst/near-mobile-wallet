/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SignerRequestDto = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        network: {
            type: 'Enum',
            isRequired: true,
        },
        signerAccountId: {
            type: 'string',
            isRequired: true,
        },
        requests: {
            type: 'array',
            contains: {
                properties: {
                },
            },
            isRequired: true,
        },
        dAppMetadata: {
            type: 'DAppMetadataDto',
        },
        txHash: {
            type: 'string',
        },
        createdAt: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;