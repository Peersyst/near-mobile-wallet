import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation, useQueryClient } from "react-query";
import { Action, AddKeyActionParams } from "../components/display/SignRequestDetails/actions.types";
import Queries from "../../../query/queries";

export default function useAddKeyAction() {
    const { serviceInstance, index, network } = useServiceInstance();
    const queryClient = useQueryClient();

    return useMutation(
        async (action: Action) => {
            const params = action.params as AddKeyActionParams;
            const {
                publicKey,
                accessKey: { permission },
            } = params;

            // FunctionCall AccessKey
            if (typeof permission === "object")
                await serviceInstance.addAccessKey(publicKey, permission.receiverId, permission.methodNames, permission.allowance);
            // FullAccessKey
            else await serviceInstance.addAccessKey(publicKey);
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network]);
            },
        },
    );
}
