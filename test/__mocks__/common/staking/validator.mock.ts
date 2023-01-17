import BaseMock from "../base.mock";

export interface ValidatorMockInterface {
    accountId: string;
    fee: number | null;
    status: "active" | "inactive";
}

export class ValidatorMock extends BaseMock implements ValidatorMockInterface {
    accountId: string;
    fee: number | null;
    status: "active" | "inactive";
    constructor({ accountId = "1", fee = 1, status = "active" }: Partial<ValidatorMockInterface> = {}) {
        super();
        this.accountId = accountId!;
        this.fee = fee!;
        this.status = status!;
    }
}
