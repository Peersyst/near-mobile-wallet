import { AccountBalance as BaseAccountBalance } from "near-api-js/lib/account";

/**
 * SDK Instance Types
 */
export interface BaseCreateNearSdkParams {
    chain: Chains;
    nodeUrl: string;
    baseApiUrl: string;
    nearDecimals?: number;
    enableIndexer: boolean;
}

export interface CreateNearSdkWithMnemonicParams extends BaseCreateNearSdkParams {
    mnemonic: string;
}

export interface CreateNearSdkWithSecretKeyParams extends BaseCreateNearSdkParams {
    secretKey: string;
}

export interface CreateNearSdkParams extends BaseCreateNearSdkParams {
    secretKey: string;
    nameId: string;
    nearDecimals?: number;
    mnemonic?: string;
}

export enum Chains {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    BETANET = "betanet",
    LOCAL = "local",
}

export type AccountBalance = BaseAccountBalance;

/**
 * PERMISSIONS & ACCESS
 */
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

/**
 * STAKING
 */

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

export interface StakingDeposit {
    validatorId: string;
    amount: number;
}

/**
 * FT
 */
export interface TokenMetadata {
    spec: string;
    name: string;
    symbol: string;
    icon: string; // Image in svg
    reference: string | null;
    reference_hash: string | null;
    decimals: string;
}

export interface Token {
    metadata: TokenMetadata;
    balance: string;
    contractId?: string;
}

/**
 * NFTS
 */

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
    contractId: string;
}
/**
 * TRANSACTION & ACTIONS
 */

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

export enum TransactionStatus {
    UNKNOWN = "UNKNOWN",
    FAILURE = "FAILURE",
    SUCCESS_VALUE = "SUCCESS_VALUE",
    SUCCESS_RECEIPT_ID = "SUCCESS_RECEIPT_ID",
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
    transactionActions: Action[];
}

export enum FeeRate {
    SLOW = 1000,
    NORMAL = 100000,
    FAST = 10000000,
}

export enum EnhancedTransactionActionKind {
    TRANSFER_RECEIVE = "TRANSFER_RECEIVE",
    TRANSFER_SEND = "TRANSFER_SEND",
}

export type ActionKind = Exclude<keyof typeof TransactionActionKind, "TRANSFER"> | EnhancedTransactionActionKind;

export type TransactionWithoutActions = Omit<Transaction, "transactionActions">;

export type Action = Omit<TransactionAction, "actionKind"> & {
    transaction: TransactionWithoutActions;
    actionKind: ActionKind;
};
