import BaseMock from "mocks/common/base.mock";
import { Validator } from "near-peersyst-sdk";
import * as useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { ValidatorMock } from "mocks/NearSdk";
import { UseGetStakingValidatorsReturn } from "module/staking/hook/useGetStakingValidators";

export class UseGetStakingValidatorsMock extends BaseMock implements UseGetStakingValidatorsReturn {
    stakingValidators: Validator[];
    isLoading: boolean;
    refetch: () => void;
    constructor({ stakingValidators, isLoading, refetch }: Partial<UseGetStakingValidatorsReturn> = {}) {
        super();
        this.stakingValidators = stakingValidators || [new ValidatorMock()];
        this.isLoading = isLoading || false;
        this.refetch = refetch || jest.fn();
        this.mock = jest
            .spyOn(useGetStakingValidators, "default")
            .mockReturnValue({ stakingValidators: this.stakingValidators, isLoading: this.isLoading, refetch: this.refetch });
    }
}
