import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { useMemo } from "react";
import { isCurrentValidatorActive } from "module/staking/utils/isCurrentValidatorActive";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";

export interface UseGetAllStakingValidatorsReturn {
    stakingValidators: StakingValidator[];
    isLoading: boolean;
}

export default function (index?: number): UseGetAllStakingValidatorsReturn {
    const { data: allValidators, isLoading } = useGetAllValidators(index);

    return useMemo(() => {
        if (allValidators) {
            const stakingValidators: StakingValidator[] = allValidators?.map((validator) => {
                const stakingValidator: StakingValidator = {
                    status: isCurrentValidatorActive(validator.accountId, allValidators!) ? "active" : "inactive",
                    ...validator,
                };
                return stakingValidator;
            });
            return { stakingValidators, isLoading };
        }
        return { stakingValidators: [], isLoading };
    }, [allValidators]);
}
