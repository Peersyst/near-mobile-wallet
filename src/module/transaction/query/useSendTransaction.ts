import { useMutation } from "react-query";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import { useSetRecoilState } from "recoil";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useRefetchQuery } from "../../../query/useRefetchQuery";

const useSendTransaction = () => {
    const selectedWallet = useSelectedWalletIndex();
    const setWalletState = useSetRecoilState(walletState);
    const refetchQuery = useRefetchQuery();

    return useMutation(
        (params: SendTransactionParams) => {
            const serviceInstance = serviceInstancesMap.get(selectedWallet)!;
            return serviceInstance.sendTransaction(params);
        },
        {
            onSuccess: async (hash: string) => {
                setWalletState((state) => ({
                    ...state,
                    wallets: state.wallets.map((w) =>
                        w.index === selectedWallet
                            ? { ...w, uncommittedTransactionHashes: [...(w.uncommittedTransactionHashes || []), hash] }
                            : w,
                    ),
                }));
                await WalletStorage.addUncommittedTransactionHash(selectedWallet, hash);
                await refetchQuery(["uncommittedTransactions", selectedWallet]);
            },
        },
    );
};

export default useSendTransaction;
