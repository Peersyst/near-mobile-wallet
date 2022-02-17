import { render } from "test-utils";
import TextLogo from "module/common/component/display/TextLogo/TextLogo";

describe("Chip tests", () => {
    test("Renders correctly", () => {
        const screen = render(<TextLogo />);
        const chip = screen.getByText("BULL");
        expect(chip).toBeDefined();
        expect(screen.getByTestId("LogoIcon"));
    });
});
