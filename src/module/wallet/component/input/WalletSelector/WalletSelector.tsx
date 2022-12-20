import Select, { SelectProps } from "module/common/component/input/Select/Select";
import WalletItem from "./WalletItem";
import WalletSelectorItem from "./WalletSelectorItem";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletSelector from "module/wallet/hook/useWalletSelector";

export type WalletSelectorProps = Omit<
    SelectProps<number>,
    "options" | "children" | "renderValue" | "icon" | "placeholder" | "title" | "multiple"
>;

const WalletSelector = ({ style, value, onChange, defaultValue, ...rest }: WalletSelectorProps): JSX.Element => {
    const translate = useTranslate();

    const { selectedIndex, selectedWallet, setWalletIndex, wallets } = useWalletSelector({ value, onChange, defaultValue });

    return (
        <Select
            value={selectedIndex}
            onChange={setWalletIndex}
            style={style}
            title={translate("select_a_wallet")}
            placeholder={translate("no_account_selected")}
            renderValue={() => (selectedWallet !== undefined ? <WalletItem index={selectedIndex} /> : undefined)}
            {...rest}
        >
            {wallets.map((_, index) => (
                <WalletSelectorItem index={index} key={index} />
            ))}
        </Select>
    );
};

export default WalletSelector;
