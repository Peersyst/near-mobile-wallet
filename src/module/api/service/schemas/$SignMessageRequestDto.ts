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
        network: {
            type: 'Enum',
            isRequired: true,
        },
        response: {
            properties: {
            },
            isRequired: true,
        },
    },
} as const;