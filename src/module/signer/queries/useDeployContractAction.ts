import { Action, DeployContractActionParams } from "../components/display/SignRequestDetails/actions.types";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "query/queries";
import { useQueryClient } from "react-query";

export default function useDeployContractAction() {
    const { serviceInstance, index, network } = useServiceInstance();
    const queryClient = useQueryClient();

    const deployContractAction = async (action: Action) => {
        const { code } = action.params as DeployContractActionParams;
        await serviceInstance.deployContract(code);
        await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
    };

    return deployContractAction;
}
