import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQueryClient } from "react-query";
import { Action, AddKeyActionParams } from "../components/display/SignRequestDetails/actions.types";
import Queries from "../../../query/queries";

export default function useAddKeyAction(indexProp?: number) {
    const { serviceInstance, index, network } = useServiceInstance(indexProp);
    const queryClient = useQueryClient();

    const addKeyAction = async (action: Action) => {
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
        await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
        await queryClient.invalidateQueries([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network]);
    };

    return addKeyAction;
}
