import { useMutation } from "react-query";
import { Action } from "../components/display/SignRequestDetails/actions.types";
import useAddKeyAction from "./useAddKeyAction";
import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import useStakeAction from "./useStakeAction";
import useDeployContractAction from "./useDeployContractAction";
import useTransferAction from "./useTransferAction";
import useDeleteAccessKey from "./useDeleteAccessKey";
import useFunctionCallAction from "./useFunctionCallAction";
import { SignerErrorCodes } from "../errors/SignerErrorCodes";

interface UseSignRequestActionsParams {
    id: string;
    actions: Action[];
    receiverId?: string;
}

export default function useSignRequestActions(index?: number) {
    const { serviceInstance } = useServiceInstance(index);

    const addKeyAction = useAddKeyAction(index);
    const stakeAction = useStakeAction(index);
    const deleteAccessKey = useDeleteAccessKey(index);
    const transferAction = useTransferAction(index);
    const deployContractAction = useDeployContractAction(index);
    const functionCallAction = useFunctionCallAction(index);

    const signAction = async (action: Action, receiverId?: string) => {
        switch (action.type) {
            case "AddKey": {
                await addKeyAction(action);
                break;
            }
            case "Stake": {
                await stakeAction(action);
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
            case "DeployContract": {
                await deployContractAction(action);
                break;
            }
            case "FunctionCall": {
                await functionCallAction(action, receiverId);
                break;
            }
            default:
                throw new Error(SignerErrorCodes.ACTION_NOT_SUPPORTED);
        }
    };

    return useMutation(async ({ id, actions, receiverId }: UseSignRequestActionsParams) => {
        for (const action of actions) {
            await signAction(action, receiverId);
        }
        return await SignerRequestService.approveSignerRequest(id, { signerAccountId: serviceInstance.getAddress() });
    });
}
