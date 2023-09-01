import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Action, FunctionCallActionParams } from "../components/display/SignRequestDetails/actions.types";
import { SignerErrorCodes } from "../errors/SignerErrorCodes";
import { useQueryClient } from "react-query";
import Queries from "../../../query/queries";

export default function useFunctionCallAction(indexProp?: number) {
    const { serviceInstance, index, network } = useServiceInstance(indexProp);
    const queryClient = useQueryClient();

    const functionCallAction = async (action: Action, receiverId?: string) => {
        const { methodName, args, deposit, gas } = action.params as FunctionCallActionParams;

        if (!receiverId) throw new Error(SignerErrorCodes.RECEIVER_ID_REQUIRED);

        await serviceInstance.signAndSendFunctionCall(receiverId, methodName, deposit, args, gas);
        await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
        await queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
    };

    return functionCallAction;
}
