import { render } from "test-utils";
import TextLogo from "module/common/component/display/TextLogo/TextLogo";

describe("TextLogo tests", () => {
    test("Renders correctly", () => {
        const screen = render(<TextLogo />);
        const chip = screen.getByText("BULL");
        expect(chip).toBeDefined();
    });
});
