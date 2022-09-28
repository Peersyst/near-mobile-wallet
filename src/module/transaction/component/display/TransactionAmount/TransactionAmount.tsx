import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import transactionTypeToBalanceAction from "module/transaction/component/display/TransactionAmount/utils/transactionTypeToBalanceAction";
import { FullTransaction } from "module/common/service/CkbSdkService.types";

export interface TransactionAmountProps extends Omit<BalanceProps, "balance" | "units" | "action"> {
    amount: FullTransaction["amount"];
    currency: FullTransaction["token"];
    type: FullTransaction["type"];
}

const TransactionAmount = ({ amount, type, ...rest }: TransactionAmountProps): JSX.Element => {
    return <Balance action={transactionTypeToBalanceAction(type)} balance={amount} units={"token"} {...rest} />;
};

export default TransactionAmount;
