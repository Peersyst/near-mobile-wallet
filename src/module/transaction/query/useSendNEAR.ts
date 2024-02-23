import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../refactor/ui/common/query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import sendState from "../state/SendState";
import { usePostHog } from "posthog-react-native";
import BigNumber from "bignumber.js";

export interface UseSendNEARParams {
    to: string;
    amount: string;
}

const useSendNEAR = (senderIndex: number) => {
    const { serviceInstance, network } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const setSendState = useSetRecoilState(sendState);
    const posthog = usePostHog();

    return useMutation(
        async ({ to, amount }: UseSendNEARParams) => {
            const txHash = await serviceInstance.sendTransaction(to, amount);
            setSendState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: (_data, variables) => {
                invalidateQueries([Queries.GET_BALANCE, Queries.ACTIONS]);
                try {
                    posthog?.capture("send", {
                        asset: "NEAR",
                        wallet_address: serviceInstance.getAddress(),
                        destination_address: variables.to,
                        amount: BigNumber(variables.amount).toNumber(),
                        chain: network,
                    });
                } catch (error) {}
            },
        },
    );
};

export default useSendNEAR;
