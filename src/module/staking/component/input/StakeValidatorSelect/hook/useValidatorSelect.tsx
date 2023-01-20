import { useContext } from "react";
import { ValidatorSelectContextInterface, ValidatorSelectContext } from "../context/ValidatorSelectContext";

export const useValidatorSelect = (): ValidatorSelectContextInterface => {
    return useContext(ValidatorSelectContext);
};
