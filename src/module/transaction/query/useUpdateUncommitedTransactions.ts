import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useWalletState from "module/wallet/hook/useWalletState";
import updateWalletUncommitedTxHashes from "module/wallet/utils/updateWalletUncommitedTxHashes";

export default function useUpdateUncommittedTransactions(walletIndex?: number) {
    const { index, network } = useServiceInstance(walletIndex);
    const { state, setWallets } = useWalletState();
    const updateHashes = (hashes: string[] = []) => {
        const updatedWallets = updateWalletUncommitedTxHashes(state.wallets, index, network, hashes);
        setWallets(updatedWallets);
    };
    return updateHashes;
}
