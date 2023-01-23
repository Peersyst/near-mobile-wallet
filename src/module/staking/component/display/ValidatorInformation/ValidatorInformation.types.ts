import { StakingBalance, Validator } from "near-peersyst-sdk";

export interface ValidatorInformationProps {
    validator: Validator;
    balanceType: keyof StakingBalance;
    showEdit?: boolean;
    onEdit?: () => void;
}

export type ValidatorStatusTagProps = Pick<Validator, "active">;
