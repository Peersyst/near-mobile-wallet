import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { ActionKind, EnhancedTransactionActionKind } from "near-peersyst-sdk";

export interface ActionAmountProps extends Omit<BalanceProps, "action" | "balance"> {
    actionKind: ActionKind;
    amount: BalanceProps["balance"];
}

//TODO: add support for FT
export const ACTIONS_WITH_ADD: ActionKind[] = [EnhancedTransactionActionKind.TRANSFER_RECEIVE];

const ActionAmount = ({ actionKind, amount, ...rest }: ActionAmountProps): JSX.Element => {
    const action = ACTIONS_WITH_ADD.includes(actionKind) ? "add" : "display";
    const isPrimary = action === "add";
    return <Balance action={action} balance={amount} color={(p) => p[isPrimary ? "primary" : "text"]} {...rest} />;
};

export default ActionAmount;
