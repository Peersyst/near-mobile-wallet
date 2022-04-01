import { Transaction } from "module/transaction/types";
import { BalanceProps as BaseBalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { ReactElement } from "react";

export type TransactionCardProps = Transaction & {
    TxIcon: ReactElement;
    label: string;
} & Pick<BaseBalanceProps, "units" | "action">;
