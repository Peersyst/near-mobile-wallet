import { SelectorGroup } from "@peersyst/react-native-components";
import { config } from "config";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletSelector from "module/wallet/hook/useWalletSelector";
import AccountSelector from "./AccountSelector";
import { WalletSelectorProps } from "./WalletSelectorGroup.types";

const WalletSelectorGroup = ({ value, defaultValue = 0, onChange, label, ...rest }: WalletSelectorProps) => {
    const { selectedIndex, handleChange, wallets, error } = useWalletSelector({ value, defaultValue, onChange });
    const translate = useTranslate();
    const translateError = useTranslate("error");

    return (
        <SelectorGroup
            LabelProps={{ gap: "7%" }}
            label={label || translate("select_funding_acc")}
            gap="7%"
            style={{ component: { width: "100%" } }}
            value={selectedIndex}
            error={[error, translateError("invalid_seleccted_account", { amountInNEAR: config.minBalanceToCreateAccount })]}
            onChange={handleChange}
            {...rest}
        >
            {wallets.map(({ index, account }, i) => (
                <AccountSelector key={i} index={index} account={account} />
            ))}
        </SelectorGroup>
    );
};

export default WalletSelectorGroup;
