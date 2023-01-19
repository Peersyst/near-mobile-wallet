import { Validator } from "near-peersyst-sdk";

export interface ValidatorInformationProps {
    validator: Validator;
}

export type ValidatorStatusTagProps = Pick<Validator, "active">;
