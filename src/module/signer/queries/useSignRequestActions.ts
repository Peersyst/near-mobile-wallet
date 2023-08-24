import { useMutation, useQueryClient } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import useAddKeyAction from "./useAddKeyAction";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useDeleteAccessKey from "./useDeleteAccessKey";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
}

export default function useSignRequestActions() {
    const { serviceInstance } = useServiceInstance();
    const queryClient = useQueryClient();

    const { action: addKeyAction, queriesToInvalidate: addKeyQueries } = useAddKeyAction();
    const { action: deleteAccessKey, queriesToInvalidate: deleteAccessKeyQueries } = useDeleteAccessKey();

    const signAction = async (action: Action) => {
        switch (action.type) {
            case "AddKey": {
                await addKeyAction(action);
                await queryClient.invalidateQueries([...addKeyQueries]);
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
