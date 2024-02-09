/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DAppMetadataDto } from './DAppMetadataDto';
export type SignerRequestDto = {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    network: 'mainnet' | 'testnet';
    signerAccountId: string;
    requests: Array<Record<string, any>>;
    dAppMetadata?: DAppMetadataDto;
    txHash?: Array<string>;
    createdAt: string;
    updatedAt: string;
};

