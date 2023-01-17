import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import BaseMock from "../base.mock";
import { ValidatorMock } from "./validator.mock";

export interface StakeStateMockInterface {
    amount?: string;
    validator: StakingValidator;
}

export class StakeStateMock extends BaseMock implements StakeStateMockInterface {
    amount?: string;
    validator: StakingValidator;
    constructor({ amount, validator }: Partial<StakeStateMockInterface> = {}) {
        super();
        this.validator = validator || new ValidatorMock();
        this.amount = amount || "1";
    }
}
