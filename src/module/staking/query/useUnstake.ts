import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import waitForIndexer from "module/transaction/utils/waitForIndexer";
import { useSetRecoilState } from "recoil";
import stakeState from "../state/StakeState";

export interface UnstakeParams {
    amount: string;
    validatorId: string;
}

export default function (senderIndex?: number) {
    const setStateState = useSetRecoilState(stakeState);
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ amount, validatorId }: UnstakeParams) => {
            const txHash = await serviceInstance.unstakeFromValidator(validatorId, amount);
            setStateState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: async () => {
                await invalidateServiceInstanceQueries([Queries.TOTAL_STAKING_BALANCE, Queries.ACTIONS, Queries.GET_CURRENT_VALIDATORS]);
            },
        },
    );
}
