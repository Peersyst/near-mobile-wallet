import { Validator } from "near-peersyst-sdk";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";

interface UseGetWithdrawValidatorReturn {
    validators: Validator[];
    isLoading: boolean;
}

export default function (): UseGetWithdrawValidatorReturn {
    const { stakingValidators, isLoading } = useGetStakingValidators();

    if (stakingValidators) {
        const availableValidators = stakingValidators.filter(({ stakingBalance }) => stakingBalance!.available !== "0");
        return {
            validators: availableValidators,
            isLoading,
        };
    }
    return { validators: [], isLoading };
}
