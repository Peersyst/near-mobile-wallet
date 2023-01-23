import { StakingBalanceMock, ValidatorMock } from "mocks/NearSdk";
import { renderHook } from "@testing-library/react-hooks";
import useGetWithdrawValidators from "module/staking/hook/useGetWithdrawValidators";
import { waitFor } from "@testing-library/react-native";
import * as useGetStakingValidators from "module/staking/hook/useGetStakingValidators";

describe("useGetWithdrawValidators tests", () => {
    afterEach(() => jest.restoreAllMocks());

    test("Returns withdraw validators", async () => {
        const stakingBalanceMockWithAvailable = new StakingBalanceMock({ available: "10" });
        const stakingBalanceMockWithoutAvailable = new StakingBalanceMock({ available: "0" });
        const goodValidator = new ValidatorMock({ stakingBalance: stakingBalanceMockWithAvailable });
        const badValidator = new ValidatorMock({ stakingBalance: stakingBalanceMockWithoutAvailable });
        const validators = [goodValidator, badValidator];
        const mockGetStakingValidators = jest
            .spyOn(useGetStakingValidators, "default")
            .mockReturnValue({ stakingValidators: validators, isLoading: false, refetch: jest.fn() });

        const { result } = renderHook(() => useGetWithdrawValidators());

        await waitFor(() => expect(mockGetStakingValidators).toHaveBeenCalled());
        expect(result.current).toEqual({ isLoading: false, validators: [goodValidator] });
    });
});
