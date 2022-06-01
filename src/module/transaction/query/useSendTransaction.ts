import { useMutation } from "react-query";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

const useSendTransaction = () => {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: SendTransactionParams) => {
        const serviceInstance = serviceInstancesMap.get(selectedWallet)![network];
        const hash = await serviceInstance.sendTransaction(params);
        if (hash) await addUncommittedTransaction(selectedWallet, network, hash);
    });
};

export default useSendTransaction;
