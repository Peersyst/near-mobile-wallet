import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { GET_ACTION_REFETCH_DELAY } from "module/transaction/query/useGetActions";

export interface UseAddStakeParams {
    amount: string;
    validatorId: string;
}

const useAddStake = (senderIndex?: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ amount, validatorId }: UseAddStakeParams) => {
            await serviceInstance.depositAndStakeFromValidator(validatorId.toString(), amount.toString());
        },
        {
            onSuccess: () => {
                invalidateServiceInstanceQueries([Queries.GET_BALANCE]);
                setTimeout(() => {
                    invalidateServiceInstanceQueries([Queries.ACTIONS, Queries.TOTAL_STAKING_BALANCE, Queries.GET_CURRENT_VALIDATORS]);
                }, GET_ACTION_REFETCH_DELAY);
            },
        },
    );
};

export default useAddStake;
