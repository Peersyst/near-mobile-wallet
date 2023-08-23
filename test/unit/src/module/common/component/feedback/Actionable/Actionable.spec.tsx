import Typography from "module/common/component/display/Typography/Typography";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { fireEvent, render, screen } from "test-utils";

describe("Actionable", () => {
    test("Renders correctly", () => {
        render(
            <Actionable actionText="action" onAction={jest.fn}>
                <Typography variant="body2Strong">Test</Typography>
            </Actionable>,
        );

        expect(screen.getByText("Test")).toBeDefined();
        expect(screen.getByText("action")).toBeDefined();
    });

    test("Calls onAction when actionable is pressed", () => {
        const mockOnAction = jest.fn();

        render(
            <Actionable actionText="action" onAction={mockOnAction}>
                <Typography variant="body2Strong">Test</Typography>
            </Actionable>,
        );

        const actionButton = screen.getByRole("button", { name: "action" });
        fireEvent.press(actionButton);

        expect(mockOnAction).toHaveBeenCalledTimes(1);
    });
});
