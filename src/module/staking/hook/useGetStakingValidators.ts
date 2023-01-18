import useGetCurrentValidators from "module/staking/query/useGetCurrentValidators";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { Validator } from "near-peersyst-sdk";

interface UseGetStakingValidatorsReturn {
    stakingValidators: Validator[];
}

export default function (): UseGetStakingValidatorsReturn {
    const { data: validators } = useGetCurrentValidators();
    const { data: allValidators } = useGetAllValidators();

    const isCurrentValidatorActive = (validatorAccountId: string): boolean => {
        if (allValidators) return allValidators.some(({ accountId }) => accountId === validatorAccountId);
        return false;
    };

    if (validators) {
        const stakingValidators: Validator[] = validators?.map((validator) => {
            const stakingValidator: Validator = {
                active: isCurrentValidatorActive(validator.accountId),
                ...validator,
            };
            return stakingValidator;
        });
        return { stakingValidators };
    }
    return { stakingValidators: [] };
}
