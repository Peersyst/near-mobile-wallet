import { useState } from "react";
import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { getLuminance } from "@peersyst/react-utils";
import { translate } from "locale";
import { useTheme } from "@peersyst/react-native-styled";
import useWalletState from "module/wallet/hook/useWalletState";
import WalletItem from "./WalletItem";
import WalletSelectorItem from "./WalletSelectorItem";

export type WalletSelectorProps = Omit<
    SelectProps,
    "onChange" | "value" | "title" | "placeholder" | "multiple" | "renderValue" | "children" | "defaultValue"
> & { defaultValue?: number };

const WalletSelector = ({ style, defaultValue, ...rest }: WalletSelectorProps): JSX.Element => {
    const {
        state: { wallets, selectedWallet: defaultAccount = 0 },
    } = useWalletState();
    const { palette } = useTheme();
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultValue || defaultAccount);
    const selectedWallet = selectedIndex !== undefined ? wallets[selectedIndex] : undefined;
    const backgroundColor = selectedWallet ? palette.wallet[selectedWallet.colorIndex] : undefined;
    const textColor = getLuminance(backgroundColor || "#FFFFFF") < 0.5 ? "#FFFFFF" : "#000000";

    return (
        <Select
            value={selectedIndex}
            onChange={(i) => setSelectedIndex(i as number)}
            style={{ display: { color: textColor, ...(backgroundColor && { backgroundColor }) }, ...style }}
            title={translate("select_a_wallet")}
            placeholder={translate("no_account_selected")}
            renderValue={() => (selectedWallet !== undefined ? <WalletItem index={selectedWallet.index} color={textColor} /> : undefined)}
            {...rest}
        >
            {wallets.map(({ index: walletIndex }, index) => (
                <WalletSelectorItem walletIndex={walletIndex} index={index} key={walletIndex} />
            ))}
        </Select>
    );
};

export default WalletSelector;
