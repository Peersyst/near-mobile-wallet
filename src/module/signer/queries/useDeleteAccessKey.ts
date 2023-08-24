import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Action, DeleteKeyActionParams } from "../components/display/SignRequestDetails/actions.types";
import Queries from "../../../query/queries";

export default function useDeleteAccessKey() {
    const { serviceInstance, index, network } = useServiceInstance();

    const deleteAccessKey = async (action: Action) => {
        const { publicKey } = action.params as DeleteKeyActionParams;
        await serviceInstance.deleteAccessKey(publicKey);
    };

    return {
        action: deleteAccessKey,
        queriesToInvalidate: [
            [Queries.ACTIONS, index, network],
            [Queries.GET_ACCOUNT_ACCESS_KEYS, index, network],
        ],
    };
}
