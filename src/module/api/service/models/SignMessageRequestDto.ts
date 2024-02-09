/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DAppMetadataDto } from './DAppMetadataDto';
export type SignMessageRequestDto = {
    id: string;
    message: string;
    receiver: string;
    nonce: Array<number>;
    callbackUrl?: string;
    network: 'mainnet' | 'testnet';
    response: Record<string, any>;
    receiverMetadata?: DAppMetadataDto;
    status: 'pending' | 'approved' | 'rejected';
};

