import AddStakeValidatorScreen from "module/staking/screen/SelectValidatorScreen/AddStakeSelectValidatorScreen/AddStakeSelectValidatorScreen";
import { render, translate } from "test-utils";
import { UseServiceInstanceMock } from "mocks/common";
import { screen, waitFor } from "@testing-library/react-native";
import { act } from "@testing-library/react-hooks";
import { ValidatorMock } from "test-mocks";

describe("Tests for AddStakeValidatorScreen", () => {
    test("Renders correctly", async () => {
        const { serviceInstance } = new UseServiceInstanceMock();
        const mockValidator = new ValidatorMock();
        const mockGetAllValidators = jest.spyOn(serviceInstance, "getAllValidators").mockResolvedValue([mockValidator]);

        render(<AddStakeValidatorScreen />);

        await act(() => waitFor(() => expect(mockGetAllValidators).toHaveBeenCalled()));

        expect(screen.getByText(translate("enter_new_validator"))).toBeDefined();
        expect(screen.getAllByTestId("UserCheckIcon")).toHaveLength(1);
        expect(screen.getAllByText(translate("inactive"))).toHaveLength(1);
        expect(screen.getAllByText(mockValidator.accountId)).toHaveLength(1);
    });
});
