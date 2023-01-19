import { renderHook } from "test-utils";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { UseServiceInstanceMock } from "mocks/common";
import { ValidatorMock } from "mocks/NearSdk/validator.mock";
import { waitFor } from "@testing-library/react-native";

describe("useGetStakingValidators tests", () => {
    afterEach(() => jest.restoreAllMocks());

    test("Returns stakingValidators", async () => {
        const { serviceInstance } = new UseServiceInstanceMock();
        const validator = new ValidatorMock();
        const mockGetCurrentValidators = jest.spyOn(serviceInstance, "getCurrentValidators");
        const mockGetAllValidators = jest.spyOn(serviceInstance, "getAllValidators");

        const { result } = renderHook(() => useGetStakingValidators());

        await waitFor(() => expect(mockGetCurrentValidators).toHaveBeenCalled());
        await waitFor(() => expect(mockGetAllValidators).toHaveBeenCalled());
        expect(result.current).toEqual({ isLoading: false, stakingValidators: [validator], refetch: expect.any(Function) });
    });
});
