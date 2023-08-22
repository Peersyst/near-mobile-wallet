import { useMutation, useQueryClient } from "react-query";
import { Action, TransferActionParams } from "../components/display/SignRequestDetails/actions.types";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "query/queries";

export interface UseTransferActionParams {
    action: Action;
    receiverId: string;
}

export default function useTransferAction() {
    const { serviceInstance, index, network } = useServiceInstance();
    const queryClient = useQueryClient();

    return useMutation(
        async ({ action, receiverId }: UseTransferActionParams) => {
            const { deposit } = action.params as TransferActionParams;
            await serviceInstance.sendTransaction(receiverId, deposit);
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
                await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
            },
        },
    );
}
