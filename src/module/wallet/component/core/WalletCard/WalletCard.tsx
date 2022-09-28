import useGetBalance from "module/wallet/query/useGetBalance";
import { ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Wallet } from "module/wallet/state/WalletState";
import useWalletColorIndex from "module/wallet/hook/useWalletColorIndex";
import { WalletCardRoot, WalletContent } from "./WalletCard.styles";
import WalletCardHeader from "./WalletCardHeader/WalletCardHeader";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useGetCkbPrice } from "module/common/query/useGetCkbPrice";
import useCkbConversion from "module/common/hook/useCkbConversion";
import { useState } from "react";
import { Suspense, Row } from "@peersyst/react-native-components";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import Balance from "../../display/Balance/Balance";

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
        <WalletCardRoot color={color}>
            <WalletContent>
                <WalletCardHeader index={index} name={name} />
                <Suspense isLoading={balance === undefined} activityIndicatorColor="white" activityIndicatorSize={25}>
                    <TouchableWithoutFeedback onPress={changeCurrencyMode}>
                        <Row gap={5} alignItems="center" justifyContent="center">
                            {(synchronizing || (loadingPrice && showFiat)) && <ActivityIndicator color="white" />}
                            <Balance
                                color={(palette) => palette.white}
                                variant="h3Strong"
                                balance={showFiat ? fiatValue : balance?.freeBalance || 0}
                                unitsPosition="left"
                            />
                        </Row>
                    </TouchableWithoutFeedback>
                </Suspense>
                <WalletCardButtons />
            </WalletContent>
        </WalletCardRoot>
    );
};

export default WalletCard;
