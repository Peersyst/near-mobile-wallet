import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useRefetchServiceInstanceQueries } from "module/wallet/query/useRefetchServiceInstanceQueries";

export interface UseSendNFTParams {
    contractId: string;
    tokenId: string;
    receiverId: string;
}

const useSendNFT = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const refetchQueries = useRefetchServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ contractId, tokenId, receiverId }: UseSendNFTParams) => {
            await serviceInstance.sendNFT(contractId, tokenId, receiverId);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_BALANCE, Queries.GET_NFTS]);
                refetchQueries([Queries.ACTIONS]);
            },
        },
    );
};

export default useSendNFT;
