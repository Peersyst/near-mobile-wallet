import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { SelectDAOWalletButton } from "./SelectDAOWallet.styles";
import useWalletState from "module/wallet/hook/useWalletState";
import { FilledWalletIcon } from "icons";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

const SelectDaoWallet = (): JSX.Element => {
    const {
        state: { selectedWallet },
        setSelectedWallet,
    } = useWalletState();

    const handleWalletSelection = (index: number) => {
        setSelectedWallet(index as number);
        impactAsync(ImpactFeedbackStyle.Heavy);
    };

    return (
        <WalletSelector
            value={selectedWallet}
            onOpen={() => console.log("trying to open wallet selector")}
            onChange={(index) => handleWalletSelection(index as number)}
            display={
                <SelectDAOWalletButton>
                    <FilledWalletIcon />
                </SelectDAOWalletButton>
            }
        />
    );
};
export default SelectDaoWallet;
