import { Validator } from "near-peersyst-sdk";

export interface ValidatorInformationProps {
    validator: Validator;
    showEdit?: boolean;
    onEdit?: () => void;
}

export type ValidatorStatusTagProps = Pick<Validator, "active">;
