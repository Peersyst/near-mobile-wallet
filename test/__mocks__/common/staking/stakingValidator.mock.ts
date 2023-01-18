import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { StakingBalance } from "module/sdk";
import BaseMock from "mocks/common/base.mock";
import { StakingBalanceMock } from "mocks/NearSdk";

export class StakingValidatorMock extends BaseMock implements StakingValidator {
    accountId: string;
    fee: number | null;
    stakingBalance: StakingBalance;
    status: "active" | "inactive";
    constructor({ accountId, fee, stakingBalance, status }: Partial<StakingValidator> = {}) {
        super();
        this.accountId = accountId || "account";
        this.fee = fee || null;
        this.stakingBalance = stakingBalance || new StakingBalanceMock();
        this.status = status || "inactive";
    }
}
