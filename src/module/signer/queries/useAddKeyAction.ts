import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { QueryKey } from "react-query";
import { Action, AddKeyActionParams } from "../components/display/SignRequestDetails/actions.types";
import Queries from "../../../query/queries";

interface UseAddKeyActionReturn {
    action: (action: Action) => Promise<string>;
    queriesToInvalidate: QueryKey[];
}

export default function useAddKeyAction(): UseAddKeyActionReturn {
    const { serviceInstance, index, network } = useServiceInstance();

    const runAddKeyAction = async (action: Action) => {
        const params = action.params as AddKeyActionParams;
        const {
            publicKey,
            accessKey: { permission },
        } = params;

        // FunctionCall AccessKey
        if (typeof permission === "object")
            return await serviceInstance.addAccessKey(publicKey, permission.receiverId, permission.methodNames, permission.allowance);
        // FullAccessKey
        else return await serviceInstance.addAccessKey(publicKey);
    };

    return {
        action: runAddKeyAction,
        queriesToInvalidate: [[Queries.ACTIONS, index, network]],
    };
}
