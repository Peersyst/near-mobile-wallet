import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";

export interface UseWithdrawParams {
    validatorId: string;
}

const UseWithdraw = (senderIndex?: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ validatorId }: UseWithdrawParams) => {
            await serviceInstance.withdrawAllFromValidator(validatorId.toString());
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

export default UseWithdraw;
