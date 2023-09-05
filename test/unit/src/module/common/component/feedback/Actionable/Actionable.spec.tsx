import Typography from "module/common/component/display/Typography/Typography";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { render, screen } from "test-utils";

describe("Actionable", () => {
    test("Renders correctly", () => {
        const mockAction = <Typography variant="body2Strong">Action</Typography>;
        render(
            <Actionable action={mockAction}>
                <Typography variant="body2Strong">Test</Typography>
            </Actionable>,
        );

        expect(screen.getByText("Action")).toBeDefined();
        expect(screen.getByText("Test")).toBeDefined();
    });
});
