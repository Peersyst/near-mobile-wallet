import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import waitForIndexer from "module/transaction/utils/waitForIndexer";

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
            await waitForIndexer();
        },
        {
            onSuccess: async () => {
                await invalidateServiceInstanceQueries([Queries.TOTAL_STAKING_BALANCE, Queries.ACTIONS, Queries.GET_CURRENT_VALIDATORS]);
            },
        },
    );
}
