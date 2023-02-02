import useGetBalance from "module/wallet/query/useGetBalance";
import { Wallet } from "module/wallet/state/WalletState";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import Balance from "../../display/Balance/Balance";
import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";

export interface WalletCardProps {
    wallet: Wallet;
}

const WalletCard = ({ wallet }: WalletCardProps): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance(wallet.index);
    const { value: fiatValue } = useNativeTokenConversion(available, fiat);
    const [showFiat, setCurrencyMode] = useState<boolean>(false);

    const changeCurrencyMode = () => {
        impactAsync(ImpactFeedbackStyle.Medium);
        setCurrencyMode((value) => !value);
    };

    return (
        <BaseWalletCard wallet={wallet} gap={20}>
            {{
                content: (
                    <Balance
                        adjustsFontSizeToFit
                        textAlign="center"
                        style={{ width: "100%" }}
                        isLoading={isLoading}
                        options={{ ...(showFiat ? { maximumFractionDigits: 2, minimumFractionDigits: 2 } : {}) }}
                        spinnerProps={{ color: (p) => p.white, size: 42 }}
                        onPress={changeCurrencyMode}
                        balance={showFiat ? fiatValue : available}
                        variant="h3Strong"
                        color={(p) => p.white}
                        units={showFiat ? fiat : "token"}
                        unitsPosition={showFiat ? "left" : "right"}
                    />
                ),
                footer: <WalletCardButtons />,
            }}
        </BaseWalletCard>
    );
};

export default WalletCard;
