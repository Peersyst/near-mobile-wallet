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

    const signAction = (action: Action) => {
        switch (action.type) {
            case "AddKey": {
                addKeyAction.mutate(action);
            }
        }
    };

    return useMutation(async ({ id, actions }: UseSignRequestActionsParams) => {
        actions.map((action) => signAction(action));
        SignerRequestService.approveSignerRequest(id, { signerAccountId: serviceInstance.getAddress() });
    });
}
