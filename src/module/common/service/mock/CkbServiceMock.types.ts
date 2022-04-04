import { FeeType } from "module/settings/state/SettingsState";

export interface SdkWalletState {
    addressMap: Map<string, string>;
    firstIndexWithoutTxs: 0;
    lastHashBlock: string;
    accountCellsMap: Map<number, any[]>; //Cell
    accountTransactionMap: Map<number, any[]>; //Transaction
}

export interface CKBBalance {
    totalBalance: bigint;
    occupiedBalance: bigint;
    freeBalance: bigint;
}

export interface Transaction {
    status: TransactionStatus;
    transactionHash: string;
    inputs: DataRow[];
    outputs: DataRow[];
    type: TransactionType;
    amount: number;
    blockHash: string;
    blockNumber: number;
    timestamp: Date;
}

export enum TransactionStatus {
    PENDING = "pending",
    PROPOSED = "proposed",
    COMMITTED = "committed",
    REJECTED = "rejected",
}

export interface DataRow {
    quantity: number;
    address: string;
    type?: ScriptType;
    data?: number;
}

export interface ScriptType {
    args: string;
    codeHash: string;
    hashType: string;
}

export enum TransactionType {
    SEND_CKB = "send_ckb",
    RECEIVE_CKB = "receive_ckb",
    SEND_TOKEN = "send_token",
    RECEIVE_TOKEN = "receive_token",
    SEND_NFT = "send_nft",
    RECEIVE_NFT = "receive_nft",
    DEPOSIT_DAO = "deposit_dao",
    WITHDRAW_DAO = "withdraw_dao",
    UNLOCK_DAO = "unlock_dao",
    SMART_CONTRACT = "smart_contract",
}

export interface Nft {
    tokenId: string;
    tokenUri: string;
    data: any;
    nftName: string;
    nftSymbol: string;
    nftExtraData: string;
}

export interface DepositInDAOParams {
    amount: bigint;
    mnemonic: string[];
    feeRate?: string;
}

export interface SendTransactionParams {
    amount: bigint;
    mnemonic: string[];
    message: string;
    to: string;
    feeRate?: string;
}