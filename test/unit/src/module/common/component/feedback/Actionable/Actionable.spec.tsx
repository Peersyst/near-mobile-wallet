import Typography from "module/common/component/display/Typography/Typography";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { fireEvent, render, screen } from "test-utils";

describe("Actionable", () => {
    test("Renders correctly", () => {
        const mockAction = <Typography variant="body2Strong">Action</Typography>;
        render(
            <Actionable action={mockAction} onAction={jest.fn}>
                <Typography variant="body2Strong">Test</Typography>
            </Actionable>,
        );

        expect(screen.getByText("Action")).toBeDefined();
        expect(screen.getByText("Test")).toBeDefined();
    });

    test("Renders correctly", () => {
        const mockAction = <Typography variant="body2Strong">Action</Typography>;
        const mockOnAction = jest.fn();
        render(
            <Actionable action={mockAction} onAction={mockOnAction}>
                <Typography variant="body2Strong">Test</Typography>
            </Actionable>,
        );

        const pressableAction = screen.getByText("Action");

        fireEvent.press(pressableAction);

        expect(mockOnAction).toHaveBeenCalled();
    });
});
