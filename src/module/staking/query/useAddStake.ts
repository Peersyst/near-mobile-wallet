import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";

export interface UseAddStakeParams {
    amount: string;
    validatorId: string;
}

const useAddStake = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ amount, validatorId }: UseAddStakeParams) => {
            await serviceInstance.depositAndStakeFromValidator(validatorId.toString(), amount.toString());
        },
        {
            onSuccess: async () => {
                await invalidateServiceInstanceQueries([
                    Queries.GET_BALANCE,
                    Queries.TOTAL_STAKING_BALANCE,
                    Queries.GET_CURRENT_VALIDATORS,
                ]);
            },
        },
    );
};

export default useAddStake;
