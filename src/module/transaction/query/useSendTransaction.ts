import { useMutation } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";
import { SendTransactionParams } from "@peersyst/ckb-peersyst-sdk";

const useSendTransaction = () => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const usedIndex = selectedWallet ?? 0;
    const serviceInstance = wallets[usedIndex].serviceInstance!;
    return useMutation((params: SendTransactionParams) => serviceInstance.sendTransaction(params));
};

export default useSendTransaction;
