import AddStakeValidatorScreen from "module/staking/screen/SelectValidatorScreen/AddStakeSelectValidatorScreen/AddStakeSelectValidatorScreen";
import { render, translate } from "test-utils";
import { UseServiceInstanceMock } from "mocks/common";
import { ValidatorMock } from "mocks/NearSdk";
import { screen, waitFor } from "@testing-library/react-native";
import { act } from "@testing-library/react-hooks";

describe("Tests for AddStakeValidatorScreen", () => {
    test("Renders correctly", async () => {
        const { serviceInstance } = new UseServiceInstanceMock();
        const mockValidator = new ValidatorMock();
        const mockGetAllValidators = jest.spyOn(serviceInstance, "getAllValidators").mockResolvedValue([mockValidator]);

        render(<AddStakeValidatorScreen />);

        await act(() => waitFor(() => expect(mockGetAllValidators).toHaveBeenCalled()));

        expect(screen.getByText(translate("select_new_validator"))).toBeDefined();
        expect(screen.getAllByTestId("UserCheckIcon")).toHaveLength(1);
        expect(screen.getAllByText(translate("inactive"))).toHaveLength(1);
        expect(screen.getAllByText(mockValidator.accountId)).toHaveLength(1);
    });
});
