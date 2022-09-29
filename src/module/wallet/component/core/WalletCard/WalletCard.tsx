import useGetBalance from "module/wallet/query/useGetBalance";
import { Wallet } from "module/wallet/state/WalletState";
import WalletCardButtons from "./WalletCardButtons/WalletCardButtons";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";
import Balance from "../../display/Balance/Balance";

export interface WalletCardProps {
    wallet: Wallet;
}

export interface WalletCardRootProps {
    color: string;
}

const WalletCard = ({ wallet: { name, index, synchronizing } }: WalletCardProps): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { data: { freeBalance } = {} } = useGetBalance(index);
    const [showFiat, setCurrencyMode] = useState<boolean>(false);
    const changeCurrencyMode = () => {
        impactAsync(ImpactFeedbackStyle.Medium);
        setCurrencyMode((value) => !value);
    };

    return (
        <BaseWalletCard name={name}>
            {{
                Buttons: <WalletCardButtons />,
                Balance: (
                    <Balance
                        textAlign="center"
                        numberOfLines={1}
                        style={{ width: "100%" }}
                        isLoading={synchronizing}
                        options={{ maxDecimals: 2 }}
                        spinnerProps={{ color: (p) => p.white, size: 42 }}
                        onPress={changeCurrencyMode}
                        balance={showFiat ? "10" : freeBalance || 0}
                        variant="h3Strong"
                        color={(p) => p.white}
                        units={showFiat ? fiat : "token"}
                        unitsPosition={showFiat ? "left" : "right"}
                    />
                ),
            }}
        </BaseWalletCard>
    );
};

export default WalletCard;
