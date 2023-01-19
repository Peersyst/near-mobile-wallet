import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export interface UseAddStakeParams {
    amount: string;
    validatorId: string;
}

const useAddStake = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);

    return useMutation(async ({ amount, validatorId }: UseAddStakeParams) => {
        await serviceInstance.depositAndStakeFromValidator(validatorId.toString(), amount.toString());
    });
};

export default useAddStake;
