import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../refactor/ui/common/query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import stakeState from "../state/StakeState";

export interface UseWithdrawParams {
    validatorId: string;
}

const UseWithdraw = (senderIndex?: number) => {
    const setStateState = useSetRecoilState(stakeState);
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ validatorId }: UseWithdrawParams) => {
            const txHash = await serviceInstance.withdrawAllFromValidator(validatorId.toString());
            setStateState((oldState) => ({ ...oldState, txHash }));
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
