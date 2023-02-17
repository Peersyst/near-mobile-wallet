import { SelectorGroup } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletSelector from "module/wallet/hook/useWalletSelector";
import AccountSelector from "./AccountSelector";
import { WalletSelectorProps } from "./WalletSelectorGroup.types";

const WalletSelectorGroup = ({
    value,
    defaultValue = 0,
    minBalance,
    onChange,
    label,
    hideError: hideErrorProp,
    error: errorProp,
    ...rest
}: WalletSelectorProps) => {
    const { selectedIndex, setWalletIndex, wallets, error, hideError } = useWalletSelector({ value, defaultValue, onChange, minBalance });
    const translate = useTranslate();

    return (
        <SelectorGroup
            hideError={hideErrorProp || hideError}
            LabelProps={{ gap: "7%" }}
            label={label || translate("select_funding_acc")}
            gap="7%"
            style={{ component: { width: "100%" } }}
            value={selectedIndex}
            error={errorProp || error}
            onChange={setWalletIndex}
            {...rest}
        >
            {wallets.map(({ index, account }, i) => (
                <AccountSelector key={i} index={index} account={account} />
            ))}
        </SelectorGroup>
    );
};

export default WalletSelectorGroup;
