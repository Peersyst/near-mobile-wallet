import Select, { SelectProps } from "module/common/component/input/Select/Select";
import useWalletState from "module/wallet/hook/useWalletState";
import WalletItem from "./WalletItem";
import WalletSelectorItem from "./WalletSelectorItem";
import { useControlled } from "@peersyst/react-hooks";
import { useTranslate } from "module/common/hook/useTranslate";

export type WalletSelectorProps = Omit<
    SelectProps<number>,
    "options" | "children" | "renderValue" | "icon" | "placeholder" | "title" | "multiple"
>;

const WalletSelector = ({ style, value, onChange, defaultValue, ...rest }: WalletSelectorProps): JSX.Element => {
    const {
        state: { wallets, selectedWallet: defaultAccount = 0 },
    } = useWalletState();
    const translate = useTranslate();
    const [selectedIndex, setSelectedIndex] = useControlled((defaultValue as number) ?? defaultAccount, value as number, onChange);
    const selectedWallet = selectedIndex !== undefined ? wallets[selectedIndex] : undefined;

    const handleItemChange = (i: unknown) => {
        setSelectedIndex(i as number);
    };

    return (
        <Select
            value={selectedIndex}
            onChange={handleItemChange}
            style={style}
            title={translate("select_a_wallet")}
            placeholder={translate("no_account_selected")}
            renderValue={() => (selectedWallet !== undefined ? <WalletItem index={selectedWallet.index} /> : undefined)}
            {...rest}
        >
            {wallets.map(({ index: walletIndex }, index) => (
                <WalletSelectorItem walletIndex={walletIndex} index={index} key={walletIndex} />
            ))}
        </Select>
    );
};

export default WalletSelector;
