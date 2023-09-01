import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Action, DeleteKeyActionParams } from "../components/display/SignRequestDetails/actions.types";
import Queries from "../../../query/queries";
import { useQueryClient } from "react-query";

export default function useDeleteAccessKey(indexProp?: number) {
    const { serviceInstance, index, network } = useServiceInstance(indexProp);
    const queryClient = useQueryClient();

    const deleteAccessKey = async (action: Action) => {
        const { publicKey } = action.params as DeleteKeyActionParams;
        await serviceInstance.deleteAccessKey(publicKey);
        await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
    };

    return deleteAccessKey;
}
