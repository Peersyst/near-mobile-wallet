import { useContext } from "react";
import {
    ValidatorSelectContext,
    ValidatorSelectContextInterface,
} from "../component/input/StakeValidatorSelect/context/ValidatorSelectContext";

export const useValidatorSelect = (): ValidatorSelectContextInterface => {
    return useContext(ValidatorSelectContext);
};
