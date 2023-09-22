import { useMutation, useQueryClient } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { createAction } from "module/signer/utils/near.transactions";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
    receiverId?: string;
}

export default function useSignRequestActions(indexProp?: number) {
    const { serviceInstance, index, network } = useServiceInstance(indexProp);
    const queryClient = useQueryClient();

    return useMutation(
        async ({ id, actions, receiverId }: UseSignRequestActionsParams) => {
            const actionsMapped = actions.map((action) => createAction(action));
            const tx = await serviceInstance.signAndSendTransactions(receiverId ?? serviceInstance.getAddress(), actionsMapped);

            return await SignerRequestService.approveSignerRequest(id, {
                signerAccountId: serviceInstance.getAddress(),
                txHash: tx.transaction_outcome.id,
            });
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
                await queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
                await queryClient.invalidateQueries([Queries.IS_DAPP_CONNECTED, index, network]);
                await queryClient.invalidateQueries([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network]);
            },
        },
    );
}
