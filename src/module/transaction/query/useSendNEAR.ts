import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useRefetchServiceInstanceQueries } from "module/wallet/query/useRefetchServiceInstanceQueries";

export interface UseSendNEARParams {
    to: string;
    amount: string;
}

const useSendNEAR = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const refetchQueries = useRefetchServiceInstanceQueries(senderIndex);
    return useMutation(
        async ({ to, amount }: UseSendNEARParams) => {
            await serviceInstance.sendTransaction(to, amount);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_BALANCE]);
                refetchQueries([Queries.ACTIONS]);
            },
        },
    );
};

export default useSendNEAR;
