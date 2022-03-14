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

export interface Transaction {
    status: string;
    transactionHash: string;
    inputs: DataRow[];
    outputs: DataRow[];
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
