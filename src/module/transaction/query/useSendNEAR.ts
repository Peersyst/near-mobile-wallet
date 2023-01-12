import { useMutation, useQueryClient } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";

export interface UseSendNEARParams {
    to: string;
    amount: string;
}

const useSendNEAR = (senderIndex: number) => {
    const queryClient = useQueryClient();
    const { serviceInstance, index, network } = useServiceInstance(senderIndex);
    return useMutation(
        async ({ to, amount }: UseSendNEARParams) => {
            await serviceInstance.sendTransaction(to, amount);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
            },
        },
    );
};

export default useSendNEAR;
