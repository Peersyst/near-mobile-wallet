import { render, translate, screen } from "test-utils";
import { capitalize } from "@peersyst/react-utils";
import { ValidatorMock } from "mocks/NearSdk/validator.mock";
import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import { fireEvent } from "@testing-library/react-native";

describe("Tests for ValidatorInformation", () => {
    test("Renders correctly with active validator", () => {
        const mockedValidator = new ValidatorMock({ fee: 10 });
        render(<ValidatorInformation validator={mockedValidator} />);
        expect(screen.getByText(mockedValidator.accountId)).toBeDefined();
        expect(screen.getByText("10% " + capitalize(translate("fee")) + " - ")).toBeDefined();
        expect(screen.getByText(translate("inactive"))).toBeDefined();
        expect(screen.getByText(mockedValidator!.stakingBalance!.staked.toString() + " NEAR")).toBeDefined();
        expect(screen.getByTestId("UserCheckIcon")).toBeDefined();
    });

    test("Renders correctly with property showEdit", () => {
        const mockedValidator = new ValidatorMock({ fee: 12 });
        const mockOnEdit = jest.fn();

        render(<ValidatorInformation validator={mockedValidator} showEdit onEdit={mockOnEdit} />);
        expect(screen.getByTestId("UserCheckIcon")).toBeDefined();
        expect(screen.getByText(mockedValidator.accountId)).toBeDefined();
        expect(screen.getByText("12% " + capitalize(translate("fee")) + " - ")).toBeDefined();
        expect(screen.getByText(translate("inactive"))).toBeDefined();

        const editButton = screen.getByRole("button", { name: translate("edit") });
        expect(editButton).toBeDefined();
        fireEvent.press(editButton);
        expect(mockOnEdit).toHaveBeenCalled();
    });
});
