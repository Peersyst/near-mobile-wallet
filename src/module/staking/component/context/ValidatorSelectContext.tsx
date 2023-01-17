import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { createContext } from "react";

export interface ValidatorSelectContextInterface {
    validators: StakingValidator[] | undefined;
    isLoading: boolean;
    onSelected: (validator: StakingValidator) => void;
}

export const ValidatorSelectContext = createContext<ValidatorSelectContextInterface>({
    validators: [],
    isLoading: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSelected: () => {},
});

export const ValidatorSelectProvider = ValidatorSelectContext.Provider;
export const ValidatorSelectConsumer = ValidatorSelectContext.Consumer;
