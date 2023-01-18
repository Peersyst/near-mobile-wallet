import { render, translate } from "test-utils";
import { ValidatorMock } from "mocks/NearSdk";
import { screen, waitFor } from "@testing-library/react-native";
import UnstakeValidatorScreen from "module/staking/screen/SelectValidatorScreen/UnstakeValidatorScreen/UnstakeValidatorScreen";
import * as useGetStakingValidators from "module/staking/hook/useGetStakingValidators";

describe("Tests for UnstakeValidatorScreen", () => {
    test("Renders correctly", async () => {
        const mockValidator = new ValidatorMock();
        const mockUseGetStakingValidators = jest
            .spyOn(useGetStakingValidators, "default")
            .mockReturnValue({ stakingValidators: [mockValidator], isLoading: false, refetch: jest.fn() });

        render(<UnstakeValidatorScreen />);

        await waitFor(() => expect(mockUseGetStakingValidators).toHaveBeenCalled());

        expect(screen.getByText(translate("select_validator"))).toBeDefined();
        expect(screen.getAllByTestId("UserCheckIcon")).toHaveLength(1);
        expect(screen.getAllByText(translate("inactive"))).toHaveLength(1);
        expect(screen.getAllByText(mockValidator.accountId)).toHaveLength(1);
    });
});
