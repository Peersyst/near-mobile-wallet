import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletUtils } from "module/wallet/utils/WalletUtils";

export default function useUpdateUncommittedTransactionsState() {
    const { index } = useServiceInstance();
    const {
        state: { wallets },
        setWallets,
    } = useWalletState();
    const updateHashes = (hashes: string[] = [], walletIndex?: number) => {
        const finalIndex = walletIndex === undefined ? index : walletIndex;
        const newWallets = WalletUtils.updateWalletUncommittedTxHashes(wallets, hashes, finalIndex);
        setWallets(newWallets);
    };
    return updateHashes;
}
