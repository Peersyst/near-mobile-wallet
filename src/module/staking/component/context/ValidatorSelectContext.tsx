import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { createContext } from "react";

export interface ValidatorSelectContextInterface {
    validators: StakingValidator[] | undefined;
    isLoading: boolean;
}

export const ValidatorSelectContext = createContext<ValidatorSelectContextInterface>({
    validators: [],
    isLoading: false,
});

export const ValidatorSelectProvider = ValidatorSelectContext.Provider;
export const ValidatorSelectConsumer = ValidatorSelectContext.Consumer;
