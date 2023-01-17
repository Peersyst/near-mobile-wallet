import useGetCurrentValidators from "module/staking/query/useGetCurrentValidators";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { Validator } from "module/sdk";
import { isCurrentValidatorActive } from "module/staking/utils/isCurrentValidatorActive";

export interface StakingValidator extends Validator {
    status: "active" | "inactive";
}

interface UseGetStakingValidatorsReturn {
    stakingValidators: StakingValidator[];
}

export default function (): UseGetStakingValidatorsReturn {
    const { data: validators } = useGetCurrentValidators();
    const { data: allValidators } = useGetAllValidators();

    if (validators) {
        const stakingValidators: StakingValidator[] = validators?.map((validator) => {
            const stakingValidator: StakingValidator = {
                status: isCurrentValidatorActive(validator.accountId, allValidators!) ? "active" : "inactive",
                ...validator,
            };
            return stakingValidator;
        });
        return { stakingValidators };
    }
    return { stakingValidators: [] };
}
