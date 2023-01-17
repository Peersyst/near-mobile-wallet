import { Validator } from "near-peersyst-sdk";
import { StakingValidator } from "../hook/useGetStakingValidators";

export const isCurrentValidatorActive = (validatorAccountId: string, allValidators: Validator[]): boolean => {
    if (allValidators) return allValidators.filter(({ accountId }) => accountId === validatorAccountId).length > 0;
    return false;
};

export const getAllValidatorsWithStatus = (validators: Validator[]): StakingValidator[] => {
    return validators?.map((validator) => {
        const stakingValidator: StakingValidator = {
            status: isCurrentValidatorActive(validator.accountId, validators) ? "active" : "inactive",
            ...validator,
        };
        return stakingValidator;
    });
};
