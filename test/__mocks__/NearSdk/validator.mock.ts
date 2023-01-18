import { StakingBalance, Validator } from "near-peersyst-sdk";
import BaseMock from "mocks/common/base.mock";
import { StakingBalanceMock } from "mocks/NearSdk/stakingBalance.mock";

export class ValidatorMock extends BaseMock implements Validator {
    accountId: string;
    fee: number | null;
    stakingBalance: StakingBalance;
    constructor({ accountId, fee, stakingBalance }: Partial<Validator> = {}) {
        super();
        this.accountId = accountId || "account";
        this.fee = fee || null;
        this.stakingBalance = stakingBalance || new StakingBalanceMock();
    }
}
