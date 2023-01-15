import { StakingValidator } from "module/staking/hook/useGetStakingValidators";

export interface ValidatorInformationProps {
    validator: StakingValidator;
}

export type ValidatorStatusTagProps = Pick<StakingValidator, "status">;
