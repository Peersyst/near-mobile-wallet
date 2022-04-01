import { Transaction } from "module/transaction/types";
import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import transactionTypeToBalanceAction from "module/transaction/component/display/TransactionAmount/utils/transactionTypeToBalanceAction";

export interface TransactionAmountProps extends Omit<BalanceProps, "balance" | "units" | "action"> {
    amount: Transaction["amount"];
    currency: Transaction["token"];
    type: Transaction["type"];
}

const TransactionAmount = ({ amount, currency = "CKB", type, ...rest }: TransactionAmountProps): JSX.Element => {
    return <Balance action={transactionTypeToBalanceAction(type)} balance={amount} units={currency} {...rest} />;
};

export default TransactionAmount;
