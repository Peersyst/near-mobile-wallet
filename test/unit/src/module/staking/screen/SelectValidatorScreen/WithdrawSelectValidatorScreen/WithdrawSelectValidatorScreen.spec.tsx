import { render, translate } from "test-utils";
import WithdrawSelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/WithdrawSelectValidatorScreen/WithdrawSelectValidatorScreen";
import { screen, waitFor } from "@testing-library/react-native";
import * as useGetWithdrawValidators from "module/staking/hook/useGetWithdrawValidators";
import { StakingBalanceMock, ValidatorMock } from "mocks/NearSdk";

describe("Tests for WithdrawSelectValidatorScreen", () => {
    test("Renders correctly", async () => {
        const mockStakingBalance = new StakingBalanceMock({ available: "10" });
        const validator = new ValidatorMock({ stakingBalance: mockStakingBalance });
        const mockUseGetWithdrawValidators = jest
            .spyOn(useGetWithdrawValidators, "default")
            .mockReturnValue({ validators: [validator], isLoading: false, refetch: jest.fn() });
        render(<WithdrawSelectValidatorScreen />);

        await waitFor(() => expect(mockUseGetWithdrawValidators).toHaveBeenCalled());
        expect(screen.getByText(translate("select_validator_withdrawal"))).toBeDefined();
        expect(screen.getByText(validator.accountId)).toBeDefined();
    });
});
