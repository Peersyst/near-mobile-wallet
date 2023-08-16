/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SignerRequestDto = {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    network: 'mainnet' | 'testnet';
    signerAccountId: string;
    requests: Array<any>;
    createdAt: string;
    updatedAt: string;
};
