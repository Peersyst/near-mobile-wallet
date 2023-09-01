import { Action, TransferActionParams } from "../components/display/SignRequestDetails/actions.types";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useQueryClient } from "react-query";
import { SignerErrorCodes } from "../errors/SignerErrorCodes";

export interface UseTransferActionParams {
    action: Action;
    receiverId?: string;
}

export default function useTransferAction(indexProp?: number) {
    const { serviceInstance, index, network } = useServiceInstance(indexProp);
    const queryClient = useQueryClient();

    const transferAction = async ({ action, receiverId }: UseTransferActionParams) => {
        const { deposit } = action.params as TransferActionParams;

        if (!receiverId) throw new Error(SignerErrorCodes.RECEIVER_ID_REQUIRED);

        await serviceInstance.sendTransaction(receiverId, deposit);
        await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
        await queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
    };

    return transferAction;
}
