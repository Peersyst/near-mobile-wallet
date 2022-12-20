import { SelectItem } from "@peersyst/react-native-components";
import WalletItem from "./WalletItem";

export interface WalletSelectorItemProps {
    index: number;
}

const WalletSelectorItem = ({ index }: WalletSelectorItemProps): JSX.Element => {
    return (
        <SelectItem value={index} key={index}>
            <WalletItem index={index} />
        </SelectItem>
    );
};

export default WalletSelectorItem;
