import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { SelectDaoWalletIcon } from "./SelectDaoWallet.styles";
import useWalletState from "module/wallet/hook/useWalletState";

const SelectDaoWallet = (): JSX.Element => {
    const {
        state: { selectedWallet },
        setSelectedWallet,
    } = useWalletState();
    return (
        <WalletSelector value={selectedWallet} onChange={(index) => setSelectedWallet(index as number)} display={<SelectDaoWalletIcon />} />
    );
};
export default SelectDaoWallet;
