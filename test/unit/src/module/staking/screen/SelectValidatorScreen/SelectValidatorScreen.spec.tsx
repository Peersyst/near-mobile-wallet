import { render, translate } from "test-utils";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import { ValidatorMock } from "mocks/NearSdk";
import { screen } from "@testing-library/react-native";

describe("Tests for SelectValidatorScreen", () => {
    const mockMessage = "message";
    const mockOnFinish = jest.fn();

    test("Renders correctly without search", () => {
        const mockValidator = new ValidatorMock();
        const mockValidators = [mockValidator];

        render(
            <SelectValidatorScreen
                message={mockMessage}
                validators={mockValidators}
                loading={false}
                balanceType="staked"
                onSelected={mockOnFinish}
            />,
        );

        expect(screen.getByText(mockMessage)).toBeDefined();
        expect(screen.getAllByText(mockValidator.accountId)).toHaveLength(mockValidators.length);
        expect(screen.getAllByText("inactive")).toHaveLength(mockValidators.length);
        expect(screen.getAllByText(mockValidator.stakingBalance.staked.toString() + " NEAR")).toHaveLength(mockValidators.length);
    });

    test("Renders correctly with search", () => {
        const mockValidator = new ValidatorMock();
        const mockValidators = [mockValidator];

        render(
            <SelectValidatorScreen
                message={mockMessage}
                validators={mockValidators}
                loading={false}
                balanceType="staked"
                onSelected={mockOnFinish}
                withSearch
            />,
        );

        expect(screen.getByText(translate("enter_a_validator_account_id"))).toBeDefined();
        expect(screen.getByPlaceholderText(translate("validator_name_near"))).toBeDefined();

        expect(screen.getByText(mockMessage)).toBeDefined();
        expect(screen.getAllByText(mockValidator.accountId)).toHaveLength(mockValidators.length);
        expect(screen.getAllByText("inactive")).toHaveLength(mockValidators.length);
        expect(screen.getAllByText(mockValidator.stakingBalance.staked.toString() + " NEAR")).toHaveLength(mockValidators.length);
    });
});
