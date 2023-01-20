import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation, useQueryClient } from "react-query";
import Queries from "../../../query/queries";

export interface UnstakeParams {
    amount: string;
    validatorId: string;
}

export default function (senderIndex: number) {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const queryClient = useQueryClient();

    return useMutation(
        async ({ amount, validatorId }: UnstakeParams) => {
            await serviceInstance.unstakeFromValidator(validatorId, amount);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([Queries.GET_CURRENT_VALIDATORS]);
                queryClient.invalidateQueries([Queries.GET_ALL_VALIDATOR_IDS]);
                queryClient.invalidateQueries([Queries.GET_CURRENT_VALIDATORS]);
                queryClient.invalidateQueries([Queries.GET_BALANCE]);
            },
        },
    );
}
