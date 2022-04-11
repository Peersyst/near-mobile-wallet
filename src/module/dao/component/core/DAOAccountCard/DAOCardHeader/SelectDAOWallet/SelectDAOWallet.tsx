import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { SelectDAOWalletButton } from "./SelectDAOWallet.styles";
import useWalletState from "module/wallet/hook/useWalletState";
import { FilledWalletIcon } from "icons";

const SelectDaoWallet = (): JSX.Element => {
    const {
        state: { selectedWallet },
        setSelectedWallet,
    } = useWalletState();
    return (
        <WalletSelector
            value={selectedWallet}
            onChange={(index) => setSelectedWallet(index as number)}
            display={
                <SelectDAOWalletButton>
                    <FilledWalletIcon />
                </SelectDAOWalletButton>
            }
        />
    );
};
export default SelectDaoWallet;
