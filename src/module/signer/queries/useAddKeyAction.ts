import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";
import { Action, AddKeyActionParams } from "../components/display/SignRequestDetails/actions.types";

export default function useAddKeyAction() {
    const { serviceInstance } = useServiceInstance();

    return useMutation(async (action: Action) => {
        const params = action.params as AddKeyActionParams;
        const {
            publicKey,
            accessKey: { permission },
        } = params;

        // FunctionCall AccessKey
        if (typeof permission === "object")
            await serviceInstance.addAccessKey(publicKey, permission.receiverId, permission.methodNames, permission.allowance);
        // FullAccessKey
        else await serviceInstance.addAccessKey(publicKey);
    });
}
