import { useMutation, useQueryClient } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import useAddKeyAction from "./useAddKeyAction";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import useDeployContractAction from "./useDeployContractAction";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
}

export default function useSignRequestActions() {
    const { serviceInstance, index, network } = useServiceInstance();
    const queryClient = useQueryClient();

    const addKeyAction = useAddKeyAction();
    const deployContractAction = useDeployContractAction();

    const signAction = async (action: Action) => {
        switch (action.type) {
            case "AddKey": {
                await addKeyAction.mutateAsync(action);
                break;
            }
            case "DeployContract": {
                await deployContractAction.mutateAsync(action);
                break;
            }
        }
    };

    return useMutation(
        async ({ id, actions }: UseSignRequestActionsParams) => {
            for (const action of actions) {
                await signAction(action);
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
