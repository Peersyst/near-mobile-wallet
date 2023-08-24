/**
 * CreateAccountAction
 */
export interface CreateAccountAction {
    type: "CreateAccount";
}

/**
 * DeployContractAction
 */
interface DeployContractActionParams {
    code: Uint8Array;
}

export interface DeployContractAction {
    type: "DeployContract";
    params: DeployContractActionParams;
}

/**
 * FunctionCallAction
 */
export interface FunctionCallActionParams {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
}

export interface FunctionCallAction {
    type: "FunctionCall";
    params: FunctionCallActionParams;
}

/**
 * TransferAction
 */
export interface TransferActionParams {
    deposit: string;
}
export interface TransferAction {
    type: "Transfer";
    params: TransferActionParams;
}

/**
 * StakeAction
 */
interface StakeActionParams {
    stake: string;
    publicKey: string;
}

export interface StakeAction {
    type: "Stake";
    params: StakeActionParams;
}

/**
 * AddKeyPermission
 */
export type AddKeyPermission =
    | "FullAccess"
    | {
          receiverId: string;
          allowance?: string;
          methodNames?: Array<string>;
      };

/**
 * AddKeyAction
 */
export interface AddKeyActionParams {
    publicKey: string;
    accessKey: {
        nonce?: number;
        permission: AddKeyPermission;
    };
}
export interface AddKeyAction {
    type: "AddKey";
    params: AddKeyActionParams;
}

/**
 * DeleteKeyAction
 */
export interface DeleteKeyActionParams {
    publicKey: string;
}

export interface DeleteKeyAction {
    type: "DeleteKey";
    params: DeleteKeyActionParams;
}

/**
 * DeleteAccountAction
 */
interface DeleteAccountActionParams {
    beneficiaryId: string;
}
export interface DeleteAccountAction {
    type: "DeleteAccount";
    params: DeleteAccountActionParams;
}

export type Action =
    | DeployContractAction
    | FunctionCallAction
    | TransferAction
    | StakeAction
    | AddKeyAction
    | DeleteKeyAction
    | DeleteAccountAction;

export type ActionType = Action["type"];
export type ActionParams =
    | DeployContractActionParams
    | FunctionCallActionParams
    | TransferActionParams
    | StakeActionParams
    | AddKeyActionParams
    | DeleteKeyActionParams
    | DeleteAccountActionParams;

export enum SignerRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}
