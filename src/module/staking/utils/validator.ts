import { Validator } from "near-peersyst-sdk";

export const isCurrentValidatorActive = (validatorAccountId: string, allValidators: Validator[]): boolean => {
    if (allValidators) return allValidators.filter(({ accountId }) => accountId === validatorAccountId).length > 0;
    return false;
};

export const getValidatorsWithStatus = (validators: Validator[], allValidators: Validator[]): Validator[] => {
    return validators?.map((validator) => {
        const stakingValidator: Validator = {
            active: isCurrentValidatorActive(validator.accountId, allValidators),
            ...validator,
        };
        return stakingValidator;
    });
};
