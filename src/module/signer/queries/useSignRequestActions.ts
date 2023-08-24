import { useMutation, useQueryClient } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import useAddKeyAction from "./useAddKeyAction";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useTransferAction from "./useTransferAction";
import { SignerErrorCodes } from "../errors/SignerErrorCodes";
import useDeleteAccessKey from "./useDeleteAccessKey";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
    receiverId?: string;
}

export default function useSignRequestActions() {
    const { serviceInstance } = useServiceInstance();
    const queryClient = useQueryClient();

    /* All type of calls */
    const transferAction = useTransferAction();
    const { action: addKeyAction, queriesToInvalidate: addKeyQueries } = useAddKeyAction();
    const { action: deleteAccessKey, queriesToInvalidate: deleteAccessKeyQueries } = useDeleteAccessKey();

    const signAction = async (action: Action, receiverId?: string) => {
        switch (action.type) {
            case "AddKey": {
                await addKeyAction(action);
                await queryClient.invalidateQueries([...addKeyQueries]);
                break;
            }
            case "Transfer": {
                if (!receiverId) throw new Error(SignerErrorCodes.RECEIVER_ID_REQUIRED);
                else await transferAction.mutateAsync({ action, receiverId });
                break;
            }
            case "DeleteKey": {
                await deleteAccessKey(action);
                await queryClient.invalidateQueries([...deleteAccessKeyQueries]);
                break;
            }
        }
    };

    return useMutation(async ({ id, actions }: UseSignRequestActionsParams) => {
        for (const action of actions) {
            await signAction(action);
        }
        return await SignerRequestService.approveSignerRequest(id, { signerAccountId: serviceInstance.getAddress() });
    });
}
