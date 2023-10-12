/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DAppMetadatRequest } from './DAppMetadatRequest';

export type CreateSignMessageRequest = {
    network: 'mainnet' | 'testnet';
    message: string;
    receiver: string;
    nonce: Array<number>;
    callbackUrl?: string;
    receiverMetadata?: DAppMetadatRequest;
};
