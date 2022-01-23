/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ApiException = {
    properties: {
        statusCode: {
            type: 'number',
            isRequired: true,
        },
        message: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;