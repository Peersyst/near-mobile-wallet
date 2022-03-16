import { Cell } from "module/wallet/state/WalletState";
import { AccountCardBalance, AccountCardRoot, AccountContent } from "./AccountCard.styles";
import AccountCardHeader from "./AccountCardHeader/AccountCardHeader";
import { translate } from "locale";
import CardButtons from "./CardButtons/CardButtons";
import useAddressColor from "module/wallet/hook/useAddressColor";

export interface AccountCardProps {
    cell: Cell;
}

export interface AccountCardRootProps {
    color: string;
}

const AccountCard = ({ cell }: AccountCardProps): JSX.Element => {
    const addressColor = useAddressColor(cell.address);
    return (
        <AccountCardRoot color={addressColor}>
            <AccountContent>
                <AccountCardHeader address={cell.address} name={cell.name} />
                <AccountCardBalance variant="h1" balance={cell.balance} units={translate("token")} />
                <CardButtons address={cell.address} />
            </AccountContent>
        </AccountCardRoot>
    );
};

export default AccountCard;
