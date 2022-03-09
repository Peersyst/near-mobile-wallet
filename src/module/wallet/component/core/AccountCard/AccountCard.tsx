import { Cell } from "module/wallet/state/WalletState";
import { TouchableWithoutFeedback } from "react-native";
import { AccountCardBalance, AccountCardRoot, AccountContent } from "./AccountCard.styles";
import AccountCardHeader from "./AccountCardHeader/AccountCardHeader";
import { translate } from "locale";
import CardButtons from "./CardButtons/CardButtons";

export interface AccountCardProps {
    colorIndex: number;
    cell: Cell;
}

const AccountCard = ({ colorIndex, cell }: AccountCardProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback>
            <AccountCardRoot colorIndex={colorIndex}>
                <AccountContent>
                    <AccountCardHeader address={cell.address} />
                    <AccountCardBalance variant="h1" balance={cell.balance} units={translate("token")} />
                    <CardButtons />
                </AccountContent>
            </AccountCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default AccountCard;
