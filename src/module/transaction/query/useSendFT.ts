import { useMutation, useQueryClient } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { parseTokenAmount } from "near-peersyst-sdk";

export interface UseSendTokensParams {
    contractId: string;
    amount: string;
    decimals: string;
    receiverId: string;
    memo?: string;
}

const useSendFT = (senderIndex: number) => {
    const { serviceInstance, index, network } = useServiceInstance(senderIndex);
    const queryClient = useQueryClient();
    return useMutation(
        async ({ contractId, amount, receiverId, memo, decimals }: UseSendTokensParams) => {
            const finalAmount = parseTokenAmount(amount, decimals);
            await serviceInstance.sendFungibleTokens(contractId, finalAmount, receiverId, memo);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
                queryClient.invalidateQueries([Queries.GET_FTS, index, network]);
            },
        },
    );
};

export default useSendFT;
