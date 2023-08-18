import { useMutation } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import useAddKeyAction from "./useAddKeyAction";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
}

export default function useSignRequestActions() {
    const { serviceInstance } = useServiceInstance();

    const addKeyAction = useAddKeyAction();

    const signAction = async (action: Action) => {
        switch (action.type) {
            case "AddKey": {
                await addKeyAction.mutateAsync(action);
            }
        }
    };

    return useMutation(async ({ id, actions }: UseSignRequestActionsParams) => {
        actions.map(async (action) => await signAction(action));
        return await SignerRequestService.approveSignerRequest(id, { signerAccountId: serviceInstance.getAddress() });
    });
}
