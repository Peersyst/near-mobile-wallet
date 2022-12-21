import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { AddedTransactionActionKind, EnhancedTransactionActionKind } from "../ActionCard/ActionCard.types";

export interface ActionAmountProps extends Omit<BalanceProps, "action" | "balance"> {
    actionKind: EnhancedTransactionActionKind;
    amount: BalanceProps["balance"];
}

//TODO: add support for FT
export const ACTIONS_WITH_ADD: EnhancedTransactionActionKind[] = [AddedTransactionActionKind.TRANSFER_RECEIVE];

const ActionAmount = ({ actionKind, amount, ...rest }: ActionAmountProps): JSX.Element => {
    const action = ACTIONS_WITH_ADD.includes(actionKind) ? "add" : "display";
    const isPrimary = action === "add";
    return <Balance action={action} balance={amount} color={(p) => p[isPrimary ? "primary" : "text"]} {...rest} />;
};

export default ActionAmount;
