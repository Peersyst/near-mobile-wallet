import { useMutation, useQueryClient } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import useAddKeyAction from "./useAddKeyAction";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import useTransferAction from "./useTransferAction";
import { SignerErrorCodes } from "../errors/SignerErrorCodes";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
    receiverId?: string;
}

export default function useSignRequestActions() {
    const { serviceInstance, index, network } = useServiceInstance();
    const queryClient = useQueryClient();

    /* All type of calls */
    const addKeyAction = useAddKeyAction();
    const transferAction = useTransferAction();

    const signAction = async (action: Action, receiverId?: string) => {
        switch (action.type) {
            case "AddKey": {
                await addKeyAction.mutateAsync(action);
                break;
            }
            case "Transfer": {
                if (!receiverId) throw new Error(SignerErrorCodes.RECEIVER_ID_REQUIRED);
                else await transferAction.mutateAsync({ action, receiverId });
                break;
            }
        }
    };

    return useMutation(
        async ({ id, actions, receiverId }: UseSignRequestActionsParams) => {
            for (const action of actions) {
                await signAction(action, receiverId);
            }
            return await SignerRequestService.approveSignerRequest(id, { signerAccountId: serviceInstance.getAddress() });
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
            },
        },
    );
}
