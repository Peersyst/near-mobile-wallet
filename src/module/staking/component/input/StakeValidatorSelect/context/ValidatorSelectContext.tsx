import { createContext } from "react";
import { Validator } from "near-peersyst-sdk";

export interface ValidatorSelectContextInterface {
    setSelectedValidator: (validator: Validator) => void;
}

export const ValidatorSelectContext = createContext<ValidatorSelectContextInterface>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedValidator: () => {},
});

export const ValidatorSelectProvider = ValidatorSelectContext.Provider;
export const ValidatorSelectConsumer = ValidatorSelectContext.Consumer;
