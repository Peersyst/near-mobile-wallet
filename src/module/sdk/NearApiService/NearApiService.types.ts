import { Action, Chains, StakingDeposit, TransactionActionKind, TransactionStatus } from "../NearSdkService";

export interface NearApiServiceInterface {
    getAccountsFromPublicKey(params: NearApiServiceParams): Promise<string[]>;
    getStakingDeposits(params: NearApiServiceParams): Promise<StakingDeposit[]>;
    getLikelyTokens(params: NearApiServiceParams): Promise<string[]>;
    getLikelyNfts(params: NearApiServiceParams): Promise<string[]>;
    getRecentActivity(params: NearApiServiceParams): Promise<Action[]>;
    /**
     * This method only works correctly if the indexer is enabled. Otherwise it will return only the latest actions.
     * The pagination refers to the transactions, not the actions
     */
    getActionsFromTransactions(params: NearApiServicePaginatedParams): Promise<Action[]>;
}

export interface NearApiServiceParams {
    address: string;
    chain?: Chains;
}

export interface NearApiServicePaginatedParams extends NearApiServiceParams {
    page?: number;
    pageSize?: number;
}

/**
 * Indexer types
 */
export interface TransactionIndexerDto {
    transactionHash: string;
    includedInBlockHash: string;
    includedInChunkHash: string;
    indexInChunk: number;
    blockTimestamp: string;
    signerAccountId: string;
    signerPublicKey: string;
    nonce: number;
    receiverAccountId: string;
    signature: string;
    status: TransactionStatus;
    convertedIntoReceiptId: string;
    receiptConversionGasBurnt: string | null;
    receiptConversionTokensBurnt: string | null;
    transactionActions: TransactionActionIndexerDto[];
}

export interface TransactionActionIndexerDto {
    transactionHash: string;
    indexInTransaction: number;
    actionKind: TransactionActionKind;
    args: any;
}
