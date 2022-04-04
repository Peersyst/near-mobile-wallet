export interface ScriptType {
    args: string;
    codeHash: string;
    hashType: string;
}

export interface DataRow {
    quantity: number;
    address: string;
    type?: ScriptType;
    data?: number;
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
    token?: string;
}

export enum TransactionStatus {
    PENDING = "pending",
    PROPOSED = "proposed",
    COMMITTED = "committed",
    REJECTED = "rejected",
}
