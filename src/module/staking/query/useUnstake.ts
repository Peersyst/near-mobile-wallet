import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import stakeState from "../state/StakeState";
import { usePostHog } from "posthog-react-native";

export interface UnstakeParams {
    amount: string;
    validatorId: string;
}

export default function (senderIndex?: number) {
    const setStateState = useSetRecoilState(stakeState);
    const { serviceInstance, network } = useServiceInstance(senderIndex);

    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const posthog = usePostHog();

    return useMutation(
        async ({ amount, validatorId }: UnstakeParams) => {
            const txHash = await serviceInstance.unstakeFromValidator(validatorId, amount);
            setStateState((oldState) => ({ ...oldState, txHash }));
            try {
                posthog?.capture("unstake", { amount, validator_id: validatorId, network, account: serviceInstance.getAddress() });
            } catch {}
        },
        {
            onSuccess: async () => {
                await invalidateServiceInstanceQueries([Queries.TOTAL_STAKING_BALANCE, Queries.ACTIONS, Queries.GET_CURRENT_VALIDATORS]);
            },
        },
    );
}
