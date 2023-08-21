import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "query/queries";
import { useMutation, useQueryClient } from "react-query";
import { Action, DeleteKeyActionParams } from "../components/display/SignRequestDetails/actions.types";

export default function useDeleteAccessKey() {
    const { serviceInstance, index, network } = useServiceInstance();
    const queryClient = useQueryClient();

    return useMutation(
        async (action: Action) => {
            const { publicKey } = action.params as DeleteKeyActionParams;
            await serviceInstance.deleteAccessKey(publicKey);
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network]);
                await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
            },
        },
    );
}
