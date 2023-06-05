import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import stakeState from "../state/StakeState";

export interface UseAddStakeParams {
    amount: string;
    validatorId: string;
}

const useAddStake = (senderIndex?: number) => {
    const setStateState = useSetRecoilState(stakeState);
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ amount, validatorId }: UseAddStakeParams) => {
            const txHash = await serviceInstance.depositAndStakeFromValidator(validatorId.toString(), amount.toString());
            setStateState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: () => {
                invalidateServiceInstanceQueries([
                    Queries.GET_BALANCE,
                    Queries.ACTIONS,
                    Queries.TOTAL_STAKING_BALANCE,
                    Queries.GET_CURRENT_VALIDATORS,
                ]);
            },
        },
    );
};

export default useAddStake;
