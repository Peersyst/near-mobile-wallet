import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../refactor/ui/common/query/queries";
import { parseTokenAmount } from "near-peersyst-sdk";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import sendState from "../state/SendState";
import { usePostHog } from "posthog-react-native";
import BigNumber from "bignumber.js";

export interface UseSendTokensParams {
    contractId: string;
    amount: string;
    decimals: string;
    receiverId: string;
    memo?: string;
}

const useSendFT = (senderIndex: number) => {
    const { serviceInstance, network } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const setSendState = useSetRecoilState(sendState);
    const posthog = usePostHog();

    return useMutation(
        async ({ contractId, amount, receiverId, memo, decimals }: UseSendTokensParams) => {
            const finalAmount = parseTokenAmount(amount, decimals);
            const txHash = await serviceInstance.sendFungibleTokens(contractId, finalAmount, receiverId, memo);
            setSendState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: (_data, variables) => {
                invalidateQueries([Queries.GET_BALANCE, Queries.GET_FTS, Queries.ACTIONS]);

                try {
                    posthog?.capture("send", {
                        asset: "FT",
                        wallet_address: serviceInstance.getAddress(),
                        destination_address: variables.receiverId,
                        amount: BigNumber(variables.amount).toNumber(),
                        contract_id: variables.contractId,
                        chain: network,
                    });
                } catch (error) {}
            },
        },
    );
};

export default useSendFT;
