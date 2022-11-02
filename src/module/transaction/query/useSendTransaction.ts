import { useMutation } from "react-query";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";
/* import { WalletStorage } from "module/wallet/WalletStorage"; */
import useGetServiceInstance from "module/wallet/hook/useGetServiceInstance";

const useSendTransaction = (senderIndex: number) => {
    const { serviceInstance, network } = useGetServiceInstance(senderIndex);
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: Omit<SendTransactionParams, "mnemonic">) => {
        //const mnemonic = await WalletStorage.getMnemonic(senderIndex!);
        const hash = await serviceInstance.sendTransaction(params.to, params.amount.toString());
        if (hash) await addUncommittedTransaction(senderIndex, network, hash);
    });
};

export default useSendTransaction;
