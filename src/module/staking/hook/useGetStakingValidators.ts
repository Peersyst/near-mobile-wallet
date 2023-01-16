import useGetCurrentValidators from "module/staking/query/useGetCurrentValidators";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { Validator } from "near-peersyst-sdk";

export interface StakingValidator extends Validator {
    status: "active" | "inactive";
}

interface UseGetStakingValidatorsReturn {
    stakingValidators: StakingValidator[];
    isLoading: boolean;
}

export default function (): UseGetStakingValidatorsReturn {
    const { data: validators, isLoading: isLoadingCurrentValidators } = useGetCurrentValidators();
    const { data: allValidators, isLoading: isLoadingAllValidators } = useGetAllValidators();

    const isCurrentValidatorActive = (validatorAccountId: string): boolean => {
        if (allValidators) return allValidators.filter(({ accountId }) => accountId === validatorAccountId).length > 0;
        return false;
    };

    if (validators) {
        const stakingValidators: StakingValidator[] = validators?.map((validator) => {
            const stakingValidator: StakingValidator = {
                status: isCurrentValidatorActive(validator.accountId) ? "active" : "inactive",
                ...validator,
            };
            return stakingValidator;
        });
        return { stakingValidators, isLoading: isLoadingCurrentValidators || isLoadingAllValidators };
    }
    return { stakingValidators: [], isLoading: isLoadingCurrentValidators || isLoadingAllValidators };
}
