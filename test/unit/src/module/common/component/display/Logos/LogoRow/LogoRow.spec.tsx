import LogoRow from "module/common/component/display/Logos/LogoRow/LogoRow";
import { render } from "test-utils";

describe("LogoRow test", () => {
    test("Renders correctly", () => {
        const screen = render(<LogoRow />);
        const isotipIcon = screen.getByTestId("LogotipIcon");
        expect(isotipIcon.props.width).toEqual(133.62);
        expect(isotipIcon.props.height).toEqual(20.99);
        expect(isotipIcon.props.width).toBeDefined();
        expect(screen.getByTestId("LogoIcon")).toBeDefined();
    });
});
