import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import getTransactionAmountUtils from "./utils/getTransactionAmountUtils";

export interface TransactionAmountProps extends Omit<BalanceProps, "action"> {
    type: FullTransaction["type"];
}

const TransactionAmount = ({ type, ...rest }: TransactionAmountProps): JSX.Element => {
    const { action, primary } = getTransactionAmountUtils(type) || {};
    return <Balance action={action} options={{ maxDecimals: 2 }} color={(p) => p[primary ? "primary" : "text"]} {...rest} />;
};

export default TransactionAmount;
