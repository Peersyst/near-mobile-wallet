import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../refactor/ui/common/query/queries";
import { parseTokenAmount } from "near-peersyst-sdk";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import sendState from "../state/SendState";

export interface UseSendTokensParams {
    contractId: string;
    amount: string;
    decimals: string;
    receiverId: string;
    memo?: string;
}

const useSendFT = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const setSendState = useSetRecoilState(sendState);

    return useMutation(
        async ({ contractId, amount, receiverId, memo, decimals }: UseSendTokensParams) => {
            const finalAmount = parseTokenAmount(amount, decimals);
            const txHash = await serviceInstance.sendFungibleTokens(contractId, finalAmount, receiverId, memo);
            setSendState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_BALANCE, Queries.GET_FTS, Queries.ACTIONS]);
            },
        },
    );
};

export default useSendFT;
