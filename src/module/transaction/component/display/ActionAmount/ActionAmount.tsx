import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { ActionKind, EnhancedTransactionActionKind } from "near-peersyst-sdk";

export interface ActionAmountProps extends Omit<BalanceProps, "action" | "balance"> {
    actionKind: ActionKind;
    amount: BalanceProps["balance"];
}

function showAdd(actionKind: ActionKind) {
    return actionKind === EnhancedTransactionActionKind.TRANSFER_RECEIVE;
}

const ActionAmount = ({ actionKind, amount, ...rest }: ActionAmountProps): JSX.Element => {
    const action = showAdd(actionKind) ? "add" : undefined;
    const isPrimary = action === "add";
    return <Balance action={action} balance={amount} color={(p) => p[isPrimary ? "primary" : "text"]} {...rest} />;
};

export default ActionAmount;
