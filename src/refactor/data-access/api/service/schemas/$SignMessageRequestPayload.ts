/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SignMessageRequestPayload = {
    properties: {
        accountId: {
            type: 'string',
            isRequired: true,
        },
        signature: {
            type: 'string',
            isRequired: true,
        },
        publicKey: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
