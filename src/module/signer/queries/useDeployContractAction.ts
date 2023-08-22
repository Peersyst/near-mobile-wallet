import { useMutation } from "react-query";
import { Action, DeployContractActionParams } from "../components/display/SignRequestDetails/actions.types";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export default function useDeployContractAction() {
    const { serviceInstance } = useServiceInstance();

    return useMutation(async (action: Action) => {
        const { code } = action.params as DeployContractActionParams;

        await serviceInstance.deployContract(code);
    });
}
