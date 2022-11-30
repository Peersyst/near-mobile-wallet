import { AccountBalance as BaseAccountBalance } from "near-api-js/lib/account";

export enum Chains {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    BETANET = "betanet",
    LOCAL = "local",
}

export type AccountBalance = BaseAccountBalance;

export interface StakingBalance {
    staked: number;
    pending: number;
    available: number;
    rewardsEarned?: number;
}

export interface Validator {
    accountId: string;
    fee: number | null;
    stakingBalance?: StakingBalance;
}

export interface TokenMetadata {
    spec: string;
    name: string;
    symbol: string;
    icon: string; // Image in svg
    reference: string | null;
    reference_hash: string | null;
    decimals: number;
}

export interface Token {
    metadata: TokenMetadata;
    balance: number;
}

export interface NftMetadata {
    spec: string;
    name: string;
    symbol: string;
    icon: string; // Image in svg
    reference: string | null;
    reference_hash: string | null;
    base_uri: string | null;
    media?: string;
}

export interface NftTokenMetadata {
    title: string;
    description: string;
    media: string | null; // data:image
    media_url: string | null; // Image url
    media_hash: string | null;
    copies: number;
    issued_at: number | null;
    expires_at: number | null;
    starts_at: number | null;
    updated_at: number | null;
    extra: string | null;
    reference: string | null; // Extra metadata url
    reference_hash: string | null;
}

export interface NftToken {
    token_id: string;
    owner_id: string;
    metadata: NftTokenMetadata;
    approved_account_ids?: any;
    royalty?: { [key: string]: number };
    collection_metadata?: NftMetadata;
}

export enum TransactionActionKind {
    CREATE_ACCOUNT = "CREATE_ACCOUNT",
    DEPLOY_CONTRACT = "DEPLOY_CONTRACT",
    FUNCTION_CALL = "FUNCTION_CALL",
    TRANSFER = "TRANSFER",
    STAKE = "STAKE",
    ADD_KEY = "ADD_KEY",
    DELETE_KEY = "DELETE_KEY",
    DELETE_ACCOUNT = "DELETE_ACCOUNT",
}

export interface TransactionActionDto {
    transactionHash: string;
    indexInTransaction: number;
    actionKind: TransactionActionKind;
    args: any;
}

//TODO: Update TransactionStatus
/* export enum TransactionStatus {
    UNKNOWN = "UNKNOWN",
    FAILURE = "FAILURE",
    SUCCESS_VALUE = "SUCCESS_VALUE",
    SUCCESS_RECEIPT_ID = "SUCCESS_RECEIPT_ID",
} */

export enum TransactionStatus {
    PENDING = "pending",
    PROPOSED = "proposed",
    COMMITTED = "committed",
    REJECTED = "rejected",
}

export interface TransactionDto {
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
    transactionActions: TransactionActionDto[];
}

export interface TransactionKWDto {
    block_hash: string;
    block_timestamp: string;
    hash: string;
    action_index: number;
    signer_id: string;
    receiver_id: string;
    action_kind: TransactionActionKind;
    args: any;
}

export interface PermissionDetails {
    allowance: string;
    receiverId: string;
    methodNames: string[];
}

export interface Permission {
    permissionKind: "FULL_ACCESS" | "FUNCTION_CALL";
    permissionDetails?: PermissionDetails; // Only if permissionKind is FUNCTION_CALL
}

export interface AccessKey {
    nonce: number;
    permission: Permission;
}

export interface TransactionAction {
    transactionHash: string;
    indexInTransaction: number;
    actionKind: TransactionActionKind;
    codeSha256?: string; // For DEPLOY_CONTRACT kind
    gas?: number; // For FUNCTION_CALL kind
    deposit?: string; // For FUNCTION_CALL, TRANSFER kind
    argsBase64?: string; // For FUNCTION_CALL kind
    argsJson?: any; // For FUNCTION_CALL kind
    methodName?: string; // For FUNCTION_CALL kind
    stake?: string; // For STAKE kind
    publicKey?: string; // For STAKE, ADD_KEY, DELETE_KEY kind
    accessKey?: AccessKey; // For ADD_KEY kind
    beneficiaryId?: string; // For DELETE_ACCOUNT kind
}

export interface Transaction {
    transactionHash: string;
    includedInBlockHash: string;
    blockTimestamp: string;
    signerAccountId: string;
    nonce?: number;
    receiverAccountId: string;
    status?: TransactionStatus;
    transactionActions: TransactionAction[];
}

//TODO: update this enum
export enum TransactionType {
    SEND_NATIVE_TOKEN = "send_native_token",
    RECEIVE_NATIVE_TOKEN = "receive_native_token",
    SEND_TOKEN = "send_token",
    RECEIVE_TOKEN = "receive_token",
    SEND_NFT = "send_nft",
    RECEIVE_NFT = "receive_nft",
    SMART_CONTRACT_SEND = "smart_contract_send",
    SMART_CONTRACT_RECEIVE = "smart_contract_receive",
    STAKE = "stake",
    UNSTAKE = "unstake",
}

//TODO: remove thins interface
export interface FullTransaction {
    status: TransactionStatus;
    transactionHash: string;
    inputs: any[];
    outputs: any[];
    type: TransactionType;
    scriptType?: any;
    amount: number;
    blockHash?: string;
    blockNumber?: number;
    timestamp?: Date;
    token?: string;
}

export enum FeeRate {
    SLOW = 1000,
    NORMAL = 100000,
    FAST = 10000000,
}
