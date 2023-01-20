import { Validator } from "near-peersyst-sdk";

export const isCurrentValidatorActive = (validatorAccountId: string, allValidators: Validator[]): boolean => {
    return allValidators ? allValidators.some(({ accountId }) => accountId === validatorAccountId) : false;
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
