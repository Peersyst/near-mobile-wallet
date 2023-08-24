import { useMutation } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import useAddKeyAction from "./useAddKeyAction";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useTransferAction from "./useTransferAction";
import useDeleteAccessKey from "./useDeleteAccessKey";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
    receiverId?: string;
}

export default function useSignRequestActions() {
    const { serviceInstance } = useServiceInstance();

    /* All type of calls */
    const addKeyAction = useAddKeyAction();
    const deleteAccessKey = useDeleteAccessKey();
    const transferAction = useTransferAction();

    const signAction = async (action: Action, receiverId?: string) => {
        switch (action.type) {
            case "AddKey": {
                await addKeyAction(action);
                break;
            }
            case "Transfer": {
                await transferAction({ action, receiverId });
                break;
            }
            case "DeleteKey": {
                await deleteAccessKey(action);
                break;
            }
        }
    };

    return useMutation(async ({ id, actions, receiverId }: UseSignRequestActionsParams) => {
        for (const action of actions) {
            await signAction(action, receiverId);
        }
        return await SignerRequestService.approveSignerRequest(id, { signerAccountId: serviceInstance.getAddress() });
    });
}
