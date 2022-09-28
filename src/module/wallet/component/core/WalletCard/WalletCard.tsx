import useGetBalance from "module/wallet/query/useGetBalance";
import { ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Wallet } from "module/wallet/state/WalletState";
import useWalletColorIndex from "module/wallet/hook/useWalletColorIndex";
import { WalletCardBalance, WalletContent } from "./WalletCard.styles";
import WalletCardHeader from "./WalletCardHeader/WalletCardHeader";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useGetCkbPrice } from "module/common/query/useGetCkbPrice";
import useCkbConversion from "module/common/hook/useCkbConversion";
import { useState } from "react";
import { Suspense, Row } from "@peersyst/react-native-components";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { dollar_coin, euro_coin, pound_coin, yen_coin, yuan_coin, nervos_coin } from "../../../../../asset/image";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";

export interface WalletCardProps {
    wallet: Wallet;
}

export interface WalletCardRootProps {
    color: string;
}

const WalletCard = ({ wallet: { name, index, colorIndex, synchronizing } }: WalletCardProps): JSX.Element => {
    const color = useWalletColorIndex(colorIndex);
    const { fiat } = useRecoilValue(settingsState);
    const { data: balance } = useGetBalance(index);
    const { isLoading: loadingPrice } = useGetCkbPrice(fiat);
    const { value: fiatValue } = useCkbConversion(fiat, balance?.freeBalance || 0);
    const [showFiat, setCurrencyMode] = useState<boolean>(false);
    const changeCurrencyMode = () => {
        impactAsync(ImpactFeedbackStyle.Medium);
        setCurrencyMode((value) => !value);
    };

    return (
        <BaseWalletCard name={name}>
            {{
                Buttons: <WalletCardButtons />,
                Balance: <></>,
            }}
        </BaseWalletCard>
    );
};

export default WalletCard;
