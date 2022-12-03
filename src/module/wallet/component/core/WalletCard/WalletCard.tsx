import useGetBalance from "module/wallet/query/useGetBalance";
import { Wallet } from "module/wallet/state/WalletState";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import Balance from "../../display/Balance/Balance";
import { Col } from "@peersyst/react-native-components";
import { BaseWalletCardRoot } from "module/common/component/surface/BaseWalletCard/BaseWalletCard.styles";
import Account from "../../display/Account/Account";
import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";

export interface WalletCardProps {
    wallet: Wallet;
    index: number;
}

const WalletCard = ({ wallet: { account, imported }, index }: WalletCardProps): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance(index);
    const { value: fiatValue } = useNativeTokenConversion(fiat, available);
    const [showFiat, setCurrencyMode] = useState<boolean>(false);

    const changeCurrencyMode = () => {
        impactAsync(ImpactFeedbackStyle.Medium);
        setCurrencyMode((value) => !value);
    };

    return (
        <BaseWalletCardRoot>
            <Col style={{ width: "100%" }} alignItems="center" gap={10} justifyContent="center">
                <Account imported={imported} address={account} variant="body2Strong" />
                <Balance
                    textAlign="center"
                    style={{ width: "100%" }}
                    isLoading={isLoading}
                    options={{ maximumFractionDigits: showFiat ? 2 : 3 }}
                    spinnerProps={{ color: (p) => p.white, size: 42 }}
                    onPress={changeCurrencyMode}
                    balance={showFiat ? fiatValue : available}
                    variant="h3Strong"
                    color={(p) => p.white}
                    units={showFiat ? fiat : "token"}
                    unitsPosition={showFiat ? "left" : "right"}
                />
            </Col>
            <WalletCardButtons />
        </BaseWalletCardRoot>
    );
};

export default WalletCard;
