import { useMutation } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
}

export default function useSignRequestActions() {
    const { serviceInstance } = useServiceInstance();

    return useMutation(async ({ id }: UseSignRequestActionsParams) => {
        // TODO: sign actions before approving

        return await SignerRequestService.approveSignerRequest(id, { signerAccountId: serviceInstance.getAddress() });
    });
}
