import { SelectItem } from "@peersyst/react-native-components";
import WalletItem from "./WalletItem";

export interface WalletSelectorItemProps {
    index: number;
    walletIndex: number;
}

const WalletSelectorItem = ({ index, walletIndex }: WalletSelectorItemProps): JSX.Element => {
    return (
        <SelectItem value={walletIndex} key={index}>
            <WalletItem index={walletIndex} />
        </SelectItem>
    );
};

export default WalletSelectorItem;
