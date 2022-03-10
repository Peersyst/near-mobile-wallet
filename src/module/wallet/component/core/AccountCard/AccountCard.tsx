import { Cell } from "module/wallet/state/WalletState";
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
        <AccountCardRoot colorIndex={colorIndex}>
            <AccountContent>
                <AccountCardHeader address={cell.address} />
                <AccountCardBalance variant="h1" balance={cell.balance} units={translate("token")} />
                <CardButtons />
            </AccountContent>
        </AccountCardRoot>
    );
};

export default AccountCard;
