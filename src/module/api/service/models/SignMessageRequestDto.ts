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
    response: any;
    receiverMetadata?: DAppMetadataDto;
};
