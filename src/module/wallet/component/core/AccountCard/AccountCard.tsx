import { Cell } from "module/wallet/state/WalletState";
import { AccountCardBalance, AccountCardRoot, AccountContent } from "./AccountCard.styles";
import AccountCardHeader from "./AccountCardHeader/AccountCardHeader";
import useAddressColor from "module/wallet/hook/useAddressColor";
import useGetBalance from "module/wallet/query/useGetBalance";
import { ActivityIndicator } from "react-native";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";

export interface AccountCardProps {
    cell: Cell;
}

export interface AccountCardRootProps {
    color: string;
}

const AccountCard = ({ cell: { address, name } }: AccountCardProps): JSX.Element => {
    const addressColor = useAddressColor(address);
    const { data: balance } = useGetBalance(address);
    return (
        <AccountCardRoot color={addressColor}>
            <AccountContent>
                <AccountCardHeader address={address} name={name} />
                {balance !== undefined ? (
                    <AccountCardBalance variant="h1" balance={balance} units="ckb" />
                ) : (
                    <ActivityIndicator color="white" />
                )}
                <WalletCardButtons />
            </AccountContent>
        </AccountCardRoot>
    );
};

export default AccountCard;
