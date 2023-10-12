/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SignMessageRequestDto = {
    properties: {
        id: {
            type: 'string',
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
        network: {
            type: 'Enum',
            isRequired: true,
        },
        response: {
            properties: {
            },
            isRequired: true,
        },
        receiverMetadata: {
            type: 'DAppMetadataDto',
        },
    },
} as const;