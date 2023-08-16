/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SignMessageRequestDto = {
    id: string;
    message: string;
    receiver: string;
    network: 'mainnet' | 'testnet';
    response: any;
};
