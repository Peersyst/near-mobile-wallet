import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";

export interface UnstakeParams {
    amount: string;
    validatorId: string;
}

export default function (senderIndex: number) {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ amount, validatorId }: UnstakeParams) => {
            await serviceInstance.unstakeFromValidator(validatorId, amount);
        },
        {
            onSuccess: async () => {
                await invalidateServiceInstanceQueries([Queries.GET_CURRENT_VALIDATORS, Queries.GET_ALL_VALIDATORS, Queries.GET_BALANCE]);
            },
        },
    );
}
