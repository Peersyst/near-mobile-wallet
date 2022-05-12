import { useMutation } from "react-query";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";

const useSendTransaction = () => {
    const selectedWallet = useSelectedWalletIndex();
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: SendTransactionParams) => {
        const serviceInstance = serviceInstancesMap.get(selectedWallet)!;
        const hash = await serviceInstance.sendTransaction(params);
        if (hash) await addUncommittedTransaction(selectedWallet, hash);
    });
};

export default useSendTransaction;
