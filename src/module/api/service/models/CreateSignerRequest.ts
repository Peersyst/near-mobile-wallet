/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SignerTransactionDto } from './SignerTransactionDto';

export type CreateSignerRequest = {
    network: 'mainnet' | 'testnet';
    transactions: Array<SignerTransactionDto>;
};
