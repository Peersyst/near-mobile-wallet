/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DAppMetadatRequest } from './DAppMetadatRequest';
import type { SignerTransactionDto } from './SignerTransactionDto';
export type CreateSignerRequest = {
    network: 'mainnet' | 'testnet';
    transactions: Array<SignerTransactionDto>;
    dAppMetadata?: DAppMetadatRequest;
};

