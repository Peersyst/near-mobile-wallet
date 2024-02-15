import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import sendState from "../state/SendState";
import { usePostHog } from "posthog-react-native";

export interface UseSendNFTParams {
    contractId: string;
    tokenId: string;
    receiverId: string;
}

const useSendNFT = (senderIndex: number) => {
    const { serviceInstance, network } = useServiceInstance(senderIndex);
    const invalidateQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const setSendState = useSetRecoilState(sendState);
    const posthog = usePostHog();

    return useMutation(
        async ({ contractId, tokenId, receiverId }: UseSendNFTParams) => {
            const txHash = await serviceInstance.sendNFT(contractId, tokenId, receiverId);
            setSendState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: (_data, variables) => {
                invalidateQueries([Queries.GET_BALANCE, Queries.GET_NFTS, Queries.ACTIONS]);
                posthog?.capture("send", {
                    asset: "NFT",
                    wallet_address: serviceInstance.getAddress(),
                    destination_address: variables.receiverId,
                    amount: "1",
                    contract_id: variables.contractId,
                    chain: network,
                });
            },
        },
    );
};

export default useSendNFT;
