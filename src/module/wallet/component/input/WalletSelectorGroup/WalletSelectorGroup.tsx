import { SelectorGroup } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletSelector from "module/wallet/hook/useWalletSelector";
import { WalletSelectorProps } from "./WalletSelectorGroup.types";

const WalletSelectorGroup = ({ value, defaultValue, onChange, label }: WalletSelectorProps) => {
    const { selectedIndex, handleChange, wallets } = useWalletSelector({ value, onChange, defaultValue });
    const translate = useTranslate();
    return (
        <SelectorGroup
            LabelProps={{ gap: "5%" }}
            value={selectedIndex}
            onChange={handleChange}
            label={label || translate("select_funding_acc")}
            style={{ label: { color: "red" } }}
            options={wallets.map(({ account, index }) => ({ label: account, value: index }))}
        />
    );
};

export default WalletSelectorGroup;
