/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateSignMessageRequest = {
    properties: {
        network: {
            type: 'Enum',
            isRequired: true,
        },
        message: {
            type: 'string',
            isRequired: true,
        },
        receiver: {
            type: 'string',
            isRequired: true,
        },
        nonce: {
            type: 'array',
            contains: {
                type: 'number',
            },
            isRequired: true,
        },
        callbackUrl: {
            type: 'string',
        },
        receiverMetadata: {
            type: 'DAppMetadatRequest',
        },
    },
} as const;