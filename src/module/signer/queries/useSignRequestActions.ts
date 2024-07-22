import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import { SignerRequestDto, SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { createAction } from "module/signer/utils/near.transactions";

interface UseSignRequestActionsParams {
    id: string;
    transactions: SignerRequestDto["requests"];
}

export default function useSignRequestActions(
    indexProp?: number,
    { onSuccess, ...restOptions }: UseMutationOptions<SignerRequestDto, unknown, UseSignRequestActionsParams, unknown> = {},
) {
    const { serviceInstance, index, network } = useServiceInstance(indexProp);
    const queryClient = useQueryClient();

    return useMutation(
        async ({ id, transactions }: UseSignRequestActionsParams) => {
            const txHashes = [];

            for (const { actions, receiverId } of transactions) {
                const actionsMapped = actions.map((action: Action) => createAction(action));
                const tx = await serviceInstance.signAndSendTransaction(receiverId ?? serviceInstance.getAddress(), actionsMapped);
                txHashes.push(tx.transaction_outcome.id);
            }

            return await SignerRequestService.approveSignerRequest(id, {
                signerAccountId: serviceInstance.getAddress(),
                txHash: txHashes,
            });
        },
        {
            onSuccess: async (data, variables, context) => {
                onSuccess?.(data, variables, context);
                await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
                await queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
                await queryClient.invalidateQueries([Queries.IS_DAPP_CONNECTED, index, network]);
                await queryClient.invalidateQueries([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network]);
            },
            ...restOptions,
        },
    );
}
