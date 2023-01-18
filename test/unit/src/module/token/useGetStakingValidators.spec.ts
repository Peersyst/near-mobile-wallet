import { renderHook } from "test-utils";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { UseServiceInstanceMock } from "mocks/common";
import { ValidatorMock } from "mocks/NearSdk/validator.mock";

describe("useGetStakingValidators tests", () => {
    afterEach(() => jest.restoreAllMocks());

    test("Returns stakingValidators", () => {
        const { serviceInstance } = new UseServiceInstanceMock();
        const validator = new ValidatorMock();
        jest.spyOn(serviceInstance, "getCurrentValidators").mockResolvedValue([validator]);
        jest.spyOn(serviceInstance, "getAllValidators").mockResolvedValue([validator]);

        const { result } = renderHook(() => useGetStakingValidators());
        expect(result.current).toEqual({ isLoading: false, stakingValidators: [{ status: "inactive", validator: validator }] });
    });
});
