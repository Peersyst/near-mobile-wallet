import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { getLuminance } from "@peersyst/react-utils";
import { translate } from "locale";
import { useTheme } from "@peersyst/react-native-styled";
import useWalletState from "module/wallet/hook/useWalletState";
import WalletItem from "./WalletItem";
import WalletSelectorItem from "./WalletSelectorItem";
import { useControlled } from "@peersyst/react-hooks";

export type WalletSelectorProps = Omit<SelectProps, "children" | "renderValue" | "icon" | "placeholder" | "title" | "multiple">;

const WalletSelector = ({ style, value, onChange, defaultValue, ...rest }: WalletSelectorProps): JSX.Element => {
    const {
        state: { wallets, selectedWallet: defaultAccount = 0 },
    } = useWalletState();
    const { palette } = useTheme();
    const [selectedIndex, setSelectedIndex] = useControlled((defaultValue as number) ?? defaultAccount, value as number, onChange);
    const selectedWallet = selectedIndex !== undefined ? wallets[selectedIndex] : undefined;
    const backgroundColor = selectedWallet ? palette.wallet[selectedWallet.colorIndex] : undefined;
    const textColor = getLuminance(backgroundColor || "#FFFFFF") < 0.5 ? "#FFFFFF" : "#000000";

    const handleItemChange = (i: unknown) => {
        setSelectedIndex(i as number);
    };

    return (
        <Select
            value={selectedIndex}
            onChange={handleItemChange}
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
