import { BalanceOperations, Validator } from "near-peersyst-sdk";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { useMemo } from "react";

interface UseGetWithdrawValidatorReturn {
    validators: Validator[];
    isLoading: boolean;
    refetch: () => void;
}

export default function (): UseGetWithdrawValidatorReturn {
    const { stakingValidators = [], isLoading, ...rest } = useGetStakingValidators();

    return useMemo(() => {
        if (stakingValidators) {
            return {
                validators: stakingValidators.filter(({ stakingBalance }) => BalanceOperations.isBigger(stakingBalance!.available, "0")),
                isLoading,
                ...rest,
            };
        }
        return { validators: [], isLoading, ...rest };
    }, [stakingValidators, isLoading]);
}
