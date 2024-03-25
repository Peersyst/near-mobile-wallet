import { TransactionActionKind } from "module/sdk/NearSdkService";

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
