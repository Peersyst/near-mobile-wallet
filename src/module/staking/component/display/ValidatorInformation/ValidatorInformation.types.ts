import { Validator } from "near-peersyst-sdk";

export interface ValidatorInformationProps {
    validator: Validator;
    action?: "edit";
    onAction?: () => void;
}

export type ValidatorStatusTagProps = Pick<Validator, "active">;
