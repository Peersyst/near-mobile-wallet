import { render } from "test-utils";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";

describe("Tests for SelectValidatorScreen", () => {
    test("Renders correctly", () => {
        const mockMessage = "message";
        const mockOnFinish = jest.fn();
        const mockValidators = [new ValidatorMock()];

        render(<SelectValidatorScreen message={mockMessage} validators={mockValidators} loading={false} onFinish={mockOnFinish} />);
    });
});
