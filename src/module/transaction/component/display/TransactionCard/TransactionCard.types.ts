import { Transaction } from "module/transaction/types";
import { BalanceProps as BaseBalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { ReactElement } from "react";

export type TransactionCardBalanceProps = Pick<BaseBalanceProps, "balance" | "units" | "action" | "boldUnits">;

export type TransactionCardProps = Transaction & {
    TxIcon: ReactElement;
    label: string;
    topBalance: TransactionCardBalanceProps,
    bottomBalance: TransactionCardBalanceProps
}