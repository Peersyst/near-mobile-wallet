import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useWalletState from "module/wallet/hook/useWalletState";
import { updateWalletUncommittedTxHashes } from "module/wallet/utils/wallet.utils";

export default function useUpdateUncommittedTransactionsState() {
    const { index } = useServiceInstance();
    const {
        state: { wallets },
        setWallets,
    } = useWalletState();
    const updateHashes = (hashes: string[] = [], walletIndex?: number) => {
        const finalIndex = walletIndex === undefined ? index : walletIndex;
        const newWallets = updateWalletUncommittedTxHashes(wallets, hashes, finalIndex);
        setWallets(newWallets);
    };
    return updateHashes;
}
