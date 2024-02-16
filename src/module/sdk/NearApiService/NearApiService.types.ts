import { Action, Chains, StakingDeposit, TransactionActionKind, TransactionStatus } from "../NearSdkService";

export interface NearApiServiceInterface {
    baseUrl: string;
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

/**
 * API Types
 */
export interface LikelyResponseApiDto {
    version: string;
    lastBlockTimestamp: string;
    list: string[];
}

export interface ActionApiDto {
    action_index: number;
    action_kind: TransactionActionKind;
    args: TransactionActionArgsApiDto;
    block_hash: string;
    block_timestamp: string;
    hash: string;
    receiver_id: string;
    signer_id: string;
}

export interface TransactionActionArgsApiDto {
    args_base64?: string; // For FUNCTION_CALL kind
    args_json?: unknown; // For FUNCTION_CALL kind
    code_sha256?: string; // For DEPLOY_CONTRACT kind
    gas?: number; // For FUNCTION_CALL kind
    deposit?: string; // For FUNCTION_CALL, TRANSFER kind
    method_name?: string; // For FUNCTION_CALL kind
    stake?: string; // For STAKE kind
    public_key?: string; // For STAKE, ADD_KEY, DELETE_KEY kind
    access_key?: AccessKeyApiDto; // For ADD_KEY kind
    beneficiary_id?: string; // For DELETE_ACCOUNT kind
}

export interface AccessKeyApiDto {
    nonce: number;
    permission: PermissionApiDto;
}

export interface PermissionDetailsApiDto {
    allowance: string;
    receiver_id: string;
    method_names: string[];
}

export interface PermissionApiDto {
    permission_kind: "FULL_ACCESS" | "FUNCTION_CALL";
    permission_details?: PermissionDetailsApiDto; // Only if permissionKind is FUNCTION_CALL
}

export interface StakingDepositApiDto {
    validator_id: string;
    deposit: string;
}

export interface NearblocksAccessKeyResponseDto {
    keys: NearblocksAccessKeyDto[];
}

export interface NearblocksAccessKeyDto {
    public_key: string;
    account_id: string;
    permission_kind: "FULL_ACCESS" | "FUNCTION_CALL";
    created: {
        transaction_hash: string;
        block_timestamp: number;
    };
    deleted: {
        transaction_hash: null | string;
        block_timestamp: null | number;
    };
}

export interface NearBlocsTransactionResponseDto {
    txns: NearBlocsTransactionDto[];
}

export interface NearBlocsTransactionDto {
    receipt_id: string;
    predecessor_account_id: string; //system or account.near
    receiver_account_id: string;
    transaction_hash: string;
    included_in_block_hash: string;
    block_timestamp: string;
    block: {
        block_height: number;
    };
    actions: NearblocksActionDto[];
    actions_agg: { deposit: number };
    outcomes: {
        status: boolean;
    };
    outcomes_agg: {
        transaction_fee: number;
    };
    logs: string[];
}

export interface NearblocksActionDto {
    action: TransactionActionKind;
    method: string | null;
}

export interface NearblocksTokenResponseDto {
    tokens: { fts: string[]; nfts: string[] };
}
