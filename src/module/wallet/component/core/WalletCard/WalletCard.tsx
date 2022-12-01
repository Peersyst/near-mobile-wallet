import useGetBalance from "module/wallet/query/useGetBalance";
import { Wallet } from "module/wallet/state/WalletState";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import Balance from "../../display/Balance/Balance";
import Typography from "module/common/component/display/Typography/Typography";
import { Col } from "@peersyst/react-native-components";
import { BaseWalletCardRoot } from "module/common/component/surface/BaseWalletCard/BaseWalletCard.styles";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import Address from "../../display/Address/Address";

export interface WalletCardProps {
    wallet: Wallet;
    index: number;
}

const WalletCard = ({ wallet: { account, imported }, index }: WalletCardProps): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { data: { available } = {}, isLoading } = useGetBalance(index);
    const [showFiat, setCurrencyMode] = useState<boolean>(false);
    const changeCurrencyMode = () => {
        impactAsync(ImpactFeedbackStyle.Medium);
        setCurrencyMode((value) => !value);
    };
    return (
        <BaseWalletCardRoot>
            <Col style={{ width: "100%" }} alignItems="center" gap={10} justifyContent="center">
                <Address style={{ maxWidth: "100%" }} imported={imported} type="address" address={account} variant="body2Strong" />
                <Balance
                    textAlign="center"
                    style={{ width: "100%" }}
                    isLoading={isLoading}
                    options={{ maximumFractionDigits: 2 }}
                    spinnerProps={{ color: (p) => p.white, size: 42 }}
                    onPress={changeCurrencyMode}
                    balance={showFiat ? "10" : available || 0} //TODO: add query to get fiat balance
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
