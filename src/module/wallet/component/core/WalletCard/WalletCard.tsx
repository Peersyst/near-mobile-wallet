import useGetBalance from "module/wallet/query/useGetBalance";
import { Image, ImageSourcePropType, TouchableWithoutFeedback } from "react-native";
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
import { ControlledSuspense, Row } from "react-native-components";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { image } from "../../../../../asset/image";

export interface WalletCardProps {
    wallet: Wallet;
}

export interface WalletCardRootProps {
    color: string;
}

const coinsMap: Record<FiatCurrencyType, ImageSourcePropType> = {
    usd: image.dollarCoin,
    eur: image.euroCoin,
    gbp: image.poundCoin,
    jpy: image.yenCoin,
    cny: image.yuanCoin,
};

const WalletCard = ({ wallet: { name, index, colorIndex } }: WalletCardProps): JSX.Element => {
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
                <ControlledSuspense
                    isLoading={balance === undefined || (loadingPrice && showFiat)}
                    activityIndicatorColor="white"
                    activityIndicatorSize={25}
                >
                    <TouchableWithoutFeedback onPress={changeCurrencyMode}>
                        <Row gap={5} alignItems="center" justifyContent="center">
                            <WalletCardBalance
                                variant="h1"
                                balance={showFiat ? fiatValue : balance?.freeBalance || 0}
                                decimals={showFiat ? 2 : 6}
                                units={false}
                            />
                            <Image source={coinsMap[fiat]} style={{ height: 30, width: 30, display: showFiat ? undefined : "none" }} />
                            <Image source={image.nervosCoin} style={{ height: 30, width: 30, display: showFiat ? "none" : undefined }} />
                        </Row>
                    </TouchableWithoutFeedback>
                </ControlledSuspense>
                <WalletCardButtons />
            </WalletContent>
        </WalletCardRoot>
    );
};

export default WalletCard;
