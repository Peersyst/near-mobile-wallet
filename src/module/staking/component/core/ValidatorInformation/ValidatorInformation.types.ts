import { StakingValidator } from "module/staking/hook/useGetStakingValidators";

export interface ValidatorInformationProps {
    validator: StakingValidator;
    action?: string;
    onPressAction?: () => void;
}

export type ValidatorStatusTagProps = Pick<StakingValidator, "status">;
