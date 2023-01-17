import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import BaseMock from "mocks/common/base.mock";
import { StakingBalance } from "module/sdk";

export class StakingValidatorMock extends BaseMock implements StakingValidator {
    accountId: string;
    fee: number | null;
    stakingBalance?: StakingBalance;
    status: "active" | "inactive";
    constructor({ accountId, fee, stakingBalance, status }: Partial<StakingValidator> = {}) {
        super();
        this.accountId = accountId || "mock.near";
        this.fee = fee || null;
        this.stakingBalance = stakingBalance;
        this.status = status || "inactive";
    }
}
