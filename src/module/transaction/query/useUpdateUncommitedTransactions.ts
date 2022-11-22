import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useWalletState from "module/wallet/hook/useWalletState";
import updateWalletUncommitedTxHashes from "module/wallet/utils/updateWalletUncommitedTxHashes";

export default function useUpdateUncommittedTransactions() {
    const { index, network } = useServiceInstance();
    const { state, setWallets } = useWalletState();
    const updateHashes = (hashes: string[] = [], walletIndex?: number) => {
        const finalIndex = walletIndex === undefined ? index : walletIndex;
        const updatedWallets = updateWalletUncommitedTxHashes(state.wallets, finalIndex, network, hashes);
        setWallets(updatedWallets);
    };
    return updateHashes;
}
