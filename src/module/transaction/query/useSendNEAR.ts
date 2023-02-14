import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import waitForIndexer from "../utils/waitForIndexer";

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
            await waitForIndexer();
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_BALANCE, Queries.ACTIONS]);
            },
        },
    );
};

export default useSendNEAR;
