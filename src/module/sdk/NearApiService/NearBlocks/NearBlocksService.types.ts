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
}

export interface NearBlocksTokenResponseDto {
    tokens: { fts: string[]; nfts: string[] };
}

export interface ValidatorAmount {
    [validatorId: string]: number;
}
