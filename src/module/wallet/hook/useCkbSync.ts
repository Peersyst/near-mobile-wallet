import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { serviceInstancesMap } from "module/wallet/state/WalletState";

const useCkbSync = (index?: number) => {
    const { synchronizing, index: selectedWalletIndex } = useSelectedWallet();
    const synchronize = async () => {
        await serviceInstancesMap.get(index ?? selectedWalletIndex)?.synchronize();
    };

    return {
        synchronizing,
        synchronize,
    };
};

export default useCkbSync;
