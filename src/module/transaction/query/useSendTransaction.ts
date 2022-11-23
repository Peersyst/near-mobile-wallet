import { useMutation } from "react-query";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export interface UseSendTransactionParams {
    to: string;
    amount: string;
    message?: string;
    feeRate?: number;
}

const useSendTransaction = (senderIndex: number) => {
    const { serviceInstance, network } = useServiceInstance(senderIndex);
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async ({ to, amount }: UseSendTransactionParams) => {
        const hash = await serviceInstance.sendTransaction(to, amount.toString()); //TODO: add feeRate + msg
        if (hash) await addUncommittedTransaction(senderIndex, network, hash);
    });
};

export default useSendTransaction;
