import { render } from "test-utils";
import PasswordCircle from "module/common/component/display/PasswordCircle/PasswordCircle";

describe("Button tests", () => {
    test("Renders password active (filled) circle correctly", () => {
        const screen = render(<PasswordCircle active={true} />);
        expect(screen.getByTestId("FilledCircleIcon"));
    });
    test("Renders password no-active circle correctly", () => {
        const screen = render(<PasswordCircle active={false} />);
        expect(screen.getByTestId("CircleIcon"));
    });
});
