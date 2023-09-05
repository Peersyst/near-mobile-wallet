import { ChevronDownIcon } from "icons";
import Typography from "module/common/component/display/Typography/Typography";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { fireEvent, render, screen } from "test-utils";

describe("Actionable", () => {
    test("Renders correctly", () => {
        render(
            <Actionable Action={ChevronDownIcon} onAction={jest.fn}>
                <Typography variant="body2Strong">Test</Typography>
            </Actionable>,
        );

        expect(screen.getByTestId("ChevronDownIcon")).toBeDefined();
        expect(screen.getByText("Test")).toBeDefined();
    });

    test("Calls onAction when actionable is pressed", () => {
        const mockOnAction = jest.fn();

        render(
            <Actionable Action={ChevronDownIcon} onAction={mockOnAction}>
                <Typography variant="body2Strong">Test</Typography>
            </Actionable>,
        );

        const actionButton = screen.getByRole("button");
        fireEvent.press(actionButton);

        expect(mockOnAction).toHaveBeenCalledTimes(1);
    });
});
