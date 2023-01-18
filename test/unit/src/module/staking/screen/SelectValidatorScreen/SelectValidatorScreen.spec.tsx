import { render } from "test-utils";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import { StakingValidatorMock } from "mocks/common/staking/stakingValidator.mock";

describe("Tests for SelectValidatorScreen", () => {
    test("Renders correctly", () => {
        const mockMessage = "message";
        const mockOnFinish = jest.fn();
        const mockValidators = [new StakingValidatorMock()];

        render(<SelectValidatorScreen message={mockMessage} validators={mockValidators} loading={false} onFinish={mockOnFinish} />);
    });
});
