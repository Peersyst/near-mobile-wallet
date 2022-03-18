import { SelectItem } from "react-native-components";
import { useContext } from "react";
import { SelectContext } from "module/common/component/base/input/Select/SelectContext";
import { useSelected } from "module/common/component/base/input/Select/hooks/useSelected";
import AccountItem from "module/wallet/component/input/AccountSelector/AccountItem";

export interface AccountSelectorItemProps {
    address: string;
    name: string;
    index: number;
}

const AccountSelectorItem = ({ address, name, index }: AccountSelectorItemProps): JSX.Element => {
    const { value: selected } = useContext(SelectContext);
    const isSelected = useSelected(index, selected, false);
    const itemColor = isSelected ? "#FFFFFF" : "#000000";

    return (
        <SelectItem value={index} key={address}>
            <AccountItem address={address} name={name} color={itemColor} />
        </SelectItem>
    );
};

export default AccountSelectorItem;
