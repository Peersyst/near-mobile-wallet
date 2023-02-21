import { ValidatorMock } from "mocks/NearSdk/validator.mock";
import { Validator } from "near-peersyst-sdk";
import BaseMock from "../base.mock";

export interface StakeStateMockInterface {
    amount?: string;
    validator: Validator;
}

export class StakeStateMock extends BaseMock implements StakeStateMockInterface {
    amount?: string;
    validator: Validator;
    constructor({ amount, validator }: Partial<StakeStateMockInterface> = {}) {
        super();
        this.validator = validator || new ValidatorMock();
        this.amount = amount || "1";
    }
}
