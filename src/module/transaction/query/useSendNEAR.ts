import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import sendState from "../state/SendState";

export interface UseSendNEARParams {
    to: string;
    amount: string;
}

const useSendNEAR = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const setSendState = useSetRecoilState(sendState);

    return useMutation(
        async ({ to, amount }: UseSendNEARParams) => {
            const txHash = await serviceInstance.sendTransaction(to, amount);
            setSendState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_BALANCE, Queries.ACTIONS]);
            },
        },
    );
};

export default useSendNEAR;
