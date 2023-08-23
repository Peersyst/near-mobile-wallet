import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";
import { Action, StakeActionParams } from "../components/display/SignRequestDetails/actions.types";

export default function useStakeAction() {
    const { serviceInstance } = useServiceInstance();

    return useMutation((action: Action) => {
        const { stake: amountToStake } = action.params as StakeActionParams;

        return serviceInstance.stake(amountToStake);
    });
}
