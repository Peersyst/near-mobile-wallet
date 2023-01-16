import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { ReactElement } from "react";

export interface ValidatorInformationProps {
    validator: StakingValidator;
    action?: ReactElement;
    onPressAction?: () => void;
}

export type ValidatorStatusTagProps = Pick<StakingValidator, "status">;
