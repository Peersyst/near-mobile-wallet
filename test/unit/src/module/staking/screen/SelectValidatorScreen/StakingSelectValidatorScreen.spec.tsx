import { render, translate } from "test-utils";
import { ValidatorMock } from "mocks/NearSdk";
import { screen } from "@testing-library/react-native";
import StakingSelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/StakingSelectValidatorScreen";

describe("Tests for StakingSelectValidatorScreen", () => {
    const mockMessage = "message";
    const mockOnFinish = jest.fn();

    test("Renders correctly without search", () => {
        const mockValidator = new ValidatorMock();
        const mockValidators = [mockValidator];

        render(
            <StakingSelectValidatorScreen
                message={mockMessage}
                validators={mockValidators}
                loading={false}
                stakingBalanceType="staked"
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
            <StakingSelectValidatorScreen
                message={mockMessage}
                validators={mockValidators}
                loading={false}
                stakingBalanceType="staked"
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
