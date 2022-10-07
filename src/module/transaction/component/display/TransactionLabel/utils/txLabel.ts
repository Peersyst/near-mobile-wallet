import { TransactionType } from "ckb-peersyst-sdk";
import { TransaltionResourceType } from "locale";

export const TX_LABEL: Record<Partial<TransactionType>, TransaltionResourceType> = {
    [TransactionType.SEND_NATIVE_TOKEN]: "sentTo",
    [TransactionType.SEND_TOKEN]: "sentTo",
    [TransactionType.RECEIVE_NATIVE_TOKEN]: "from",
    [TransactionType.RECEIVE_TOKEN]: "from",
    [TransactionType.SEND_NFT]: "sent_nft",
    [TransactionType.RECEIVE_NFT]: "received_nft",
    [TransactionType.SMART_CONTRACT_SEND]: "smart_contract",
    [TransactionType.SMART_CONTRACT_RECEIVE]: "received_nft",
    [TransactionType.STAKE]: "stake_added",
    [TransactionType.SMART_CONTRACT_RECEIVE]: "received_nft",
    [TransactionType.UNSTAKE]: "unstake",
    deposit_dao: "DAO_deposit",
    withdraw_dao: "DAO_withdrawal",
    unlock_dao: "unlock_DAO",
};
