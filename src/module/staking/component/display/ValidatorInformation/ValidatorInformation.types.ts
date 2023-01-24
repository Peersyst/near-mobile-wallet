import { Validator } from "near-peersyst-sdk";
import { ValidatorStakingBalanceProps } from "module/staking/component/display/ValidatorInformation/ValidatorStakingBalance/ValidatorStakingBalance";

export interface ValidatorInformationProps extends Pick<ValidatorStakingBalanceProps, "stakingBalanceType"> {
    validator: Validator;
    showEdit?: boolean;
    onEdit?: () => void;
}

export type ValidatorStatusTagProps = Pick<Validator, "active">;
