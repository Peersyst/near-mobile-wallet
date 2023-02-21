import { StakingBalanceMock, ValidatorMock } from "mocks/NearSdk";
import { renderHook } from "@testing-library/react-hooks";
import useGetWithdrawValidators from "module/staking/hook/useGetWithdrawValidators";
import { waitFor } from "@testing-library/react-native";
import { UseGetStakingValidatorsMock } from "mocks/common";

describe("useGetWithdrawValidators tests", () => {
    const goodValidator = new ValidatorMock({ stakingBalance: new StakingBalanceMock({ available: "10" }) });
    const badValidator = new ValidatorMock({ stakingBalance: new StakingBalanceMock({ available: "0" }) });
    const validators = [goodValidator, badValidator];
    const mockRefetch = jest.fn();

    let useGetWithdrawValidatorsMock: UseGetStakingValidatorsMock;

    beforeAll(() => {
        useGetWithdrawValidatorsMock = new UseGetStakingValidatorsMock({ stakingValidators: validators, refetch: mockRefetch });
    });

    afterEach(() => jest.restoreAllMocks());

    test("Returns withdraw validators", async () => {
        const { result } = renderHook(() => useGetWithdrawValidators());

        await waitFor(() => expect(useGetWithdrawValidatorsMock.mock).toHaveBeenCalled());
        expect(result.current).toStrictEqual({ validators: [goodValidator], isLoading: false, refetch: mockRefetch });
    });
});
