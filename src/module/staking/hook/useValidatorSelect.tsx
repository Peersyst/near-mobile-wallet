import { useContext } from "react";
import { ValidatorSelectContext, ValidatorSelectContextInterface } from "../component/context/ValidatorSelectContext";

export const useValidatorSelect = (): ValidatorSelectContextInterface => {
    return useContext(ValidatorSelectContext);
};
