import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

const useCkbSync = (index?: number) => {
    const network = useSelectedNetwork();
    const { synchronizing = false, index: selectedWalletIndex } = useSelectedWallet() || {};
    const synchronize = async () => {
        await serviceInstancesMap.get(index ?? selectedWalletIndex)?.[network]?.synchronize();
    };

    return {
        synchronizing,
        synchronize,
    };
};

export default useCkbSync;
