import { TransactionActionKind } from "module/sdk/NearSdkService";

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

export interface NearBlocksTransactionResponseDto {
    txns: NearBlocksTransactionDto[];
}

export type NearBlocksKitWalletStakingDepositsResponseDto = NearBlocksKitWalletStakingDeposit[];

export interface NearBlocksKitWalletStakingDeposit {
    validator_id: string;
    deposit: string;
}

export interface NearBlocksTransactionDto {
    receipt_id: string;
    predecessor_account_id: string; //system or account.near
    receiver_account_id: string;
    transaction_hash: string;
    included_in_block_hash: string;
    block_timestamp: string;
    block: {
        block_height: number;
    };
    actions: NearBlocksActionDto[];
    actions_agg: { deposit: number };
    outcomes: {
        status: boolean;
    };
    outcomes_agg: {
        transaction_fee: number;
    };
    logs: string[];
}

export interface NearBlocksActionDto {
    action: TransactionActionKind;
    method: string | null;
    deposit: number;
}

export interface NearBlocksActivityDto {
    block_hash: string;
    block_timestamp: string;
    hash: string;
    action_index: number;
    signer_id: string;
    receiver_id: string;
    action_kind: TransactionActionKind;
    args: NearBlocksArgs;
}

export interface NearBlocksArgs {
    public_key: string;
    access_key?: NearBlocksAccessKey;
    deposit?: string;
    gas?: number;
    args_json?: NearBlocksArgsJson;
    args_base64?: string | null;
    method_name?: string;
    stake?: string;
    code_sha_256?: string;
    beneficiary_id?: string;
}

export interface NearBlocksArgsJson {
    msg?: string;
    amount?: string;
    receiver_id?: string;
    account_id?: string;
    new_account_id?: string;
    new_public_key?: string;
    registration_only?: boolean;
}

export interface NearBlocksAccessKey {
    nonce: number;
    permission: NearBlocksPermission;
}

export interface NearBlocksPermission {
    permission_kind: string;
    permission_details: NearBlocksPermissionDetails;
}

export interface NearBlocksPermissionDetails {
    allowance?: string | null;
    receiver_id: string;
    method_names: string[];
}

export interface NearBlocksTokenResponseDto {
    tokens: { fts: string[]; nfts: string[] };
}
