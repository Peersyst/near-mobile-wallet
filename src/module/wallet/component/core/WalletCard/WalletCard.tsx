import useGetBalance from "module/wallet/query/useGetBalance";
import { ActivityIndicator, Image, ImageSourcePropType, TouchableWithoutFeedback } from "react-native";
import { Wallet } from "module/wallet/state/WalletState";
import useWalletColorIndex from "module/wallet/hook/useWalletColorIndex";
import { WalletCardBalance, WalletCardRoot, WalletContent } from "./WalletCard.styles";
import WalletCardHeader from "./WalletCardHeader/WalletCardHeader";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";
import settingsState, { FiatCurrencyType } from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useGetCkbPrice } from "module/common/query/useGetCkbPrice";
import useCkbConversion from "module/common/hook/useCkbConversion";
import { useState } from "react";
import { Suspense, Row } from "@peersyst/react-native-components";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { dollar_coin, euro_coin, pound_coin, yen_coin, yuan_coin, nervos_coin } from "../../../../../asset/image";

export interface WalletCardProps {
    wallet: Wallet;
}

export interface WalletCardRootProps {
    color: string;
}

const coinsMap: Record<FiatCurrencyType, ImageSourcePropType> = {
    usd: dollar_coin,
    eur: euro_coin,
    gbp: pound_coin,
    jpy: yen_coin,
    cny: yuan_coin,
};

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
        <WalletCardRoot color={color}>
            <WalletContent>
                <WalletCardHeader index={index} name={name} />
                <Suspense isLoading={balance === undefined} activityIndicatorColor="white" activityIndicatorSize={25}>
                    <TouchableWithoutFeedback onPress={changeCurrencyMode}>
                        <Row gap={5} alignItems="center" justifyContent="center">
                            {(synchronizing || (loadingPrice && showFiat)) && <ActivityIndicator color="white" />}
                            <WalletCardBalance
                                variant="h1"
                                balance={showFiat ? fiatValue : balance?.freeBalance || 0}
                                decimals={showFiat ? 2 : 6}
                                units={false}
                            />
                            <Image source={coinsMap[fiat]} style={{ height: 30, width: 30, display: showFiat ? undefined : "none" }} />
                            <Image source={nervos_coin} style={{ height: 30, width: 30, display: showFiat ? "none" : undefined }} />
                        </Row>
                    </TouchableWithoutFeedback>
                </Suspense>
                <WalletCardButtons />
            </WalletContent>
        </WalletCardRoot>
    );
};

export default WalletCard;
