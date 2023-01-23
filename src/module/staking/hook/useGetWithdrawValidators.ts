import { Validator } from "near-peersyst-sdk";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { useMemo } from "react";

interface UseGetWithdrawValidatorReturn {
    validators: Validator[];
    isLoading: boolean;
}

export default function (): UseGetWithdrawValidatorReturn {
    const { stakingValidators = [], isLoading, ...rest } = useGetStakingValidators();

    if (stakingValidators) {
        const availableValidators = useMemo(() => {
            return stakingValidators.filter(({ stakingBalance }) => stakingBalance!.available !== "0");
        }, [stakingValidators, isLoading]);
        return { validators: availableValidators, isLoading, ...rest };
    }
    return { validators: [], isLoading, ...rest };
}
