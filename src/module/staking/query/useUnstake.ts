import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { GET_ACTION_REFETCH_DELAY } from "module/transaction/query/useGetActions";

export interface UnstakeParams {
    amount: string;
    validatorId: string;
}

export default function (senderIndex?: number) {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ amount, validatorId }: UnstakeParams) => {
            await serviceInstance.unstakeFromValidator(validatorId, amount);
        },
        {
            onSuccess: async () => {
                await invalidateServiceInstanceQueries([Queries.TOTAL_STAKING_BALANCE]);
                setTimeout(() => {
                    invalidateServiceInstanceQueries([Queries.ACTIONS, Queries.GET_CURRENT_VALIDATORS]);
                }, GET_ACTION_REFETCH_DELAY);
            },
        },
    );
}
