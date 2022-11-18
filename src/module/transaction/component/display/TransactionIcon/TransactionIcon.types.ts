import { TransactionType } from "near-peersyst-sdk";

export interface TransactionIconProps {
    type: TransactionType;
}

export interface TransactionIconCompponentProps {
    active?: boolean;
}
