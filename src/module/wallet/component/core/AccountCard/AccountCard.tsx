import { Cell } from "module/wallet/state/WalletState";
import { TouchableWithoutFeedback } from "react-native";
import { AccountCardRoot } from "./AccountCard.styles";
import AccountCardBalance from "../../display/AccountCardBalance/AccountCardBalance";
import AccountCardHeader from "./AccountCardHeader/AccountCardHeader";

export interface AccountCardProps {
    colorIndex: number;
    cell: Cell;
}

const AccountCard = ({ colorIndex, cell }: AccountCardProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback>
            <AccountCardRoot colorIndex={colorIndex}>
                <AccountCardHeader address={cell.address} />
                <AccountCardBalance balance={cell.balance} />
            </AccountCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default AccountCard;
