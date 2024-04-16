import Select, { SelectProps } from "module/common/component/input/Select/Select";
import WalletItem from "./WalletItem";
import WalletSelectorItem from "./WalletSelectorItem";
import useTranslate from "module/common/hook/useTranslate";
import useWalletSelector from "module/wallet/hook/useWalletSelector";

export type WalletSelectorProps = Omit<
    SelectProps<number>,
    "options" | "children" | "renderValue" | "icon" | "placeholder" | "title" | "multiple"
> & {
    minBalance?: string;
};

const WalletSelector = ({
    style,
    value,
    onChange,
    defaultValue,
    error: errorProp,
    hideError: hideErrorProp,
    minBalance,
    ...rest
}: WalletSelectorProps): JSX.Element => {
    const translate = useTranslate();

    const {
        selectedIndex = 0,
        selectedWallet,
        setWalletIndex,
        wallets,
        error,
        hideError,
    } = useWalletSelector({ value, onChange, defaultValue, minBalance });

    const finalHideError = hideErrorProp !== undefined ? hideErrorProp : hideError;

    return (
        <Select
            value={selectedIndex}
            error={errorProp || error}
            hideError={finalHideError}
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
