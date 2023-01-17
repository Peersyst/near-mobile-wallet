import { useMutation, useQueryClient } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";

export interface UseSendNFTParams {
    contractId: string;
    tokenId: string;
    receiverId: string;
}

const useSendNFT = (senderIndex: number) => {
    const { serviceInstance, index, network } = useServiceInstance(senderIndex);
    const queryClient = useQueryClient();
    return useMutation(
        async ({ contractId, tokenId, receiverId }: UseSendNFTParams) => {
            await serviceInstance.sendNFT(contractId, tokenId, receiverId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
                queryClient.invalidateQueries([Queries.GET_NFTS, index, network]);
            },
        },
    );
};

export default useSendNFT;
