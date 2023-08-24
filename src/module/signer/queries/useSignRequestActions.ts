import { useMutation, useQueryClient } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import useAddKeyAction from "./useAddKeyAction";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import useDeployContractAction from "./useDeployContractAction";
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

    const deployContractAction = useDeployContractAction();
    /* All type of calls */
    const { action: addKeyAction, queriesToInvalidate: addKeyQueries } = useAddKeyAction();
    const { action: deleteAccessKey, queriesToInvalidate: deleteAccessKeyQueries } = useDeleteAccessKey();
    const { action: transferAction, queriesToInvalidate: transferActionQueries } = useTransferAction();

    const signAction = async (action: Action, receiverId?: string) => {
        switch (action.type) {
            case "AddKey": {
                await addKeyAction(action);
                await queryClient.invalidateQueries([...addKeyQueries]);
                break;
            }
            case "Transfer": {
                if (!receiverId) throw new Error(SignerErrorCodes.RECEIVER_ID_REQUIRED);
                else {
                    await transferAction({ action, receiverId });
                    await queryClient.invalidateQueries(transferActionQueries);
                }
                break;
            }
            case "DeleteKey": {
                await deleteAccessKey(action);
                await queryClient.invalidateQueries([...deleteAccessKeyQueries]);
                break;
            }
            case "DeployContract": {
                await deployContractAction.mutateAsync(action);
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
