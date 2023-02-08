import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { GET_ACTION_REFETCH_DELAY } from "./useGetActions";

export interface UseSendNEARParams {
    to: string;
    amount: string;
}

const useSendNEAR = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ to, amount }: UseSendNEARParams) => {
            await serviceInstance.sendTransaction(to, amount);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_BALANCE]);
                setTimeout(() => {
                    invalidateQueries([Queries.ACTIONS]);
                }, GET_ACTION_REFETCH_DELAY);
            },
        },
    );
};

export default useSendNEAR;
