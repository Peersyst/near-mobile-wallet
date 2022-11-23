import { TransactionType } from "ckb-peersyst-sdk";

export interface TransactionIconProps {
    type: TransactionType;
}

export interface TransactionIconCompponentProps {
    active?: boolean;
}
