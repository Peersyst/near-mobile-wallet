import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export interface UseSendTransactionParams {
    to: string;
    amount: string;
    message?: string;
    feeRate?: number;
}

const useSendTransaction = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);

    return useMutation(async ({ to, amount }: UseSendTransactionParams) => {
        await serviceInstance.sendTransaction(to, amount.toString()); //TODO: add feeRate + msg
    });
};

export default useSendTransaction;
