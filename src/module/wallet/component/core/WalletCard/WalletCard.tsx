import useGetBalance from "module/wallet/query/useGetBalance";
import { ActivityIndicator } from "react-native";
import { Wallet } from "module/wallet/state/WalletState";
import useWalletColorIndex from "module/wallet/hook/useWalletColorIndex";
import { WalletCardBalance, WalletCardRoot, WalletContent } from "./WalletCard.styles";
import WalletCardHeader from "./WalletCardHeader/WalletCardHeader";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";
import { convertoToCKB } from "module/wallet/utils/convertToCKB";

export interface WalletCardProps {
    wallet: Wallet;
}

export interface WalletCardRootProps {
    color: string;
}

const WalletCard = ({ wallet: { name, index, colorIndex } }: WalletCardProps): JSX.Element => {
    const { data: balance } = useGetBalance(index);
    const color = useWalletColorIndex(colorIndex);
    return (
        <WalletCardRoot color={color}>
            <WalletContent>
                <WalletCardHeader index={index} name={name} />
                {balance !== undefined ? (
                    <WalletCardBalance variant="h1" balance={convertoToCKB(balance.freeBalance)} units="ckb" />
                ) : (
                    <ActivityIndicator color="white" />
                )}
                <WalletCardButtons />
            </WalletContent>
        </WalletCardRoot>
    );
};

export default WalletCard;
