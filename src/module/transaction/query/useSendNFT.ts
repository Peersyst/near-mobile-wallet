import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../refactor/ui/common/query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import sendState from "../state/SendState";

export interface UseSendNFTParams {
    contractId: string;
    tokenId: string;
    receiverId: string;
}

const useSendNFT = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const setSendState = useSetRecoilState(sendState);

    return useMutation(
        async ({ contractId, tokenId, receiverId }: UseSendNFTParams) => {
            const txHash = await serviceInstance.sendNFT(contractId, tokenId, receiverId);
            setSendState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_BALANCE, Queries.GET_NFTS, Queries.ACTIONS]);
            },
        },
    );
};

export default useSendNFT;
