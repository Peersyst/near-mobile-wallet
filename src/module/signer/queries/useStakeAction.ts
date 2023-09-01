import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQueryClient } from "react-query";
import { Action, StakeActionParams } from "../components/display/SignRequestDetails/actions.types";
import Queries from "../../../query/queries";

export default function useStakeAction(indexProp?: number) {
    const { serviceInstance, index, network } = useServiceInstance(indexProp);
    const queryClient = useQueryClient();

    const stakeAction = async (action: Action) => {
        const { stake: amountToStake } = action.params as StakeActionParams;

        await serviceInstance.stake(amountToStake);
        await queryClient.invalidateQueries([Queries.ACTIONS, index, network]);
        await queryClient.invalidateQueries([Queries.GET_BALANCE, index, network]);
    };

    return stakeAction;
}
