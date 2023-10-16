/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DAppMetadataDto } from './DAppMetadataDto';

export type SignerRequestDto = {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    network: 'mainnet' | 'testnet';
    signerAccountId: string;
    requests: Array<any>;
    dAppMetadata?: DAppMetadataDto;
    txHash?: Array<string>;
    createdAt: string;
    updatedAt: string;
};
