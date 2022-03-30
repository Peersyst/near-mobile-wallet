import { SelectItem } from "react-native-components";
import { useContext } from "react";
import { SelectContext } from "module/common/component/base/input/Select/SelectContext";
import { useSelected } from "module/common/component/base/input/Select/hooks/useSelected";
import WalletItem from "./WalletItem";

export interface WalletSelectorItemProps {
    index: number;
    walletIndex: number;
}

const WalletSelectorItem = ({ index, walletIndex }: WalletSelectorItemProps): JSX.Element => {
    const { value: selected } = useContext(SelectContext);
    const isSelected = useSelected(index, selected, false);
    const itemColor = isSelected ? "#FFFFFF" : "#000000";

    return (
        <SelectItem value={walletIndex} key={index}>
            <WalletItem index={walletIndex} color={itemColor} />
        </SelectItem>
    );
};

export default WalletSelectorItem;
