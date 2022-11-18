import { AccountBalance as NearAccountBalance } from "near-api-js/lib/account";

export enum TransactionStatus {
    PENDING = "pending",
    PROPOSED = "proposed",
    COMMITTED = "committed",
    REJECTED = "rejected",
}
export enum TransactionType {
    SEND_NATIVE_TOKEN = "send_ckb",
    RECEIVE_NATIVE_TOKEN = "receive_ckb",
    SEND_TOKEN = "send_token",
    RECEIVE_TOKEN = "receive_token",
    SEND_NFT = "send_nft",
    RECEIVE_NFT = "receive_nft",
    SMART_CONTRACT_SEND = "smart_contract_send",
    SMART_CONTRACT_RECEIVE = "smart_contract_receive",
    STAKE = "stake",
    UNSTAKE = "unstake",
}
export enum FeeRate {
    SLOW = 1000,
    NORMAL = 100000,
    FAST = 10000000,
}

export type AccountBalance = NearAccountBalance;
