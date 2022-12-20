import { ScrollView, SelectorGroup } from "@peersyst/react-native-components";
import { config } from "config";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletSelector from "module/wallet/hook/useWalletSelector";
import AccountSelector from "./AccountSelector";
import { WalletSelectorProps } from "./WalletSelectorGroup.types";

const WalletSelectorGroup = ({ value, defaultValue = 0, onChange, label, ...rest }: WalletSelectorProps) => {
    const { selectedIndex, setWalletIndex, wallets, error } = useWalletSelector({ value, defaultValue, onChange });
    const translate = useTranslate();
    const translateError = useTranslate("error");

    return (
        <ScrollView>
            <SelectorGroup
                LabelProps={{ gap: "7%" }}
                label={label || translate("select_funding_acc")}
                gap="7%"
                style={{ component: { width: "100%" } }}
                value={selectedIndex}
                error={[error, translateError("invalid_seleccted_account", { amountInNEAR: config.minBalanceToCreateAccount })]}
                onChange={setWalletIndex}
                {...rest}
            >
                {wallets.map(({ index, account }, i) => (
                    <AccountSelector key={i} index={index} account={account} />
                ))}
            </SelectorGroup>
        </ScrollView>
    );
};

export default WalletSelectorGroup;
