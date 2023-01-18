import { Validator } from "module/sdk";

export interface ValidatorInformationProps {
    validator: Validator;
}

export type ValidatorStatusTagProps = Pick<Validator, "active">;
