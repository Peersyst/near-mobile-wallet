import useWallet from "module/wallet/hook/useWallet";
import { useState } from "react";
import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { getLuminance } from "@peersyst/react-utils";
import useAddressColor from "module/wallet/hook/useAddressColor";
import { translate } from "locale";
import AccountSelectorItem from "module/wallet/component/input/AccountSelector/AccountSelectorItem";
import AccountItem from "module/wallet/component/input/AccountSelector/AccountItem";

export type AccountSelectorProps = Omit<
    SelectProps,
    "onChange" | "value" | "title" | "placeholder" | "multiple" | "renderValue" | "children" | "defaultValue"
> & { defaultValue?: number };

const AccountSelector = ({ style, defaultValue, ...rest }: AccountSelectorProps): JSX.Element => {
    const {
        state: { cells, selectedAccount: defaultAccount = 0 },
    } = useWallet();
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultValue || defaultAccount);
    const selectedAccount = selectedIndex !== undefined ? cells[selectedIndex] : undefined;
    const addressColor = useAddressColor(selectedAccount?.address || "");
    const backgroundColor = selectedAccount ? addressColor : undefined;
    const textColor = getLuminance(backgroundColor || "#FFFFFF") < 0.5 ? "#FFFFFF" : "#000000";

    return (
        <Select
            value={selectedIndex}
            onChange={(i) => setSelectedIndex(i as number)}
            style={{ display: { color: textColor, ...(backgroundColor && { backgroundColor }) }, ...style }}
            title={translate("select_an_account")}
            placeholder={translate("no_account_selected")}
            renderValue={() =>
                selectedAccount !== undefined ? (
                    <AccountItem address={selectedAccount.address} name={selectedAccount.name} color={textColor} />
                ) : undefined
            }
            {...rest}
        >
            {cells.map(({ address, name }, index) => (
                <AccountSelectorItem address={address} name={name} index={index} key={address} />
            ))}
        </Select>
    );
};

export default AccountSelector;
