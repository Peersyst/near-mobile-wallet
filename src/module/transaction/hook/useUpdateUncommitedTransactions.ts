import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useWalletState from "module/wallet/hook/useWalletState";
import updateWalletUncommittedTxHashes from "module/wallet/utils/updateWalletUncommittedTxHashes";

export default function useUpdateUncommittedTransactions() {
    const { index, network } = useServiceInstance();
    const {
        state: { wallets },
        setWallets,
    } = useWalletState();
    const updateHashes = (hashes: string[] = [], walletIndex?: number) => {
        const finalIndex = walletIndex === undefined ? index : walletIndex;
        const updatedWallets = updateWalletUncommittedTxHashes(wallets, finalIndex, network, hashes);
        setWallets(updatedWallets);
    };
    return updateHashes;
}
