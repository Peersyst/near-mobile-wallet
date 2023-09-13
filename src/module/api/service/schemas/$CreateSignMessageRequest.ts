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
        receiverMetadata: {
            type: 'DAppMetadatRequest',
        },
    },
} as const;