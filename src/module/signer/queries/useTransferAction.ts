import { Action, TransferActionParams } from "../components/display/SignRequestDetails/actions.types";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";

export interface UseTransferActionParams {
    action: Action;
    receiverId: string;
}

export default function useTransferAction() {
    const { serviceInstance, index, network } = useServiceInstance();

    const transferAction = async ({ action, receiverId }: UseTransferActionParams) => {
        const { deposit } = action.params as TransferActionParams;
        await serviceInstance.sendTransaction(receiverId, deposit);
    };

    return {
        action: transferAction,
        queriesToInvalidate: [
            [Queries.GET_BALANCE, index, network],
            [Queries.ACTIONS, index, network],
        ],
    };
}
