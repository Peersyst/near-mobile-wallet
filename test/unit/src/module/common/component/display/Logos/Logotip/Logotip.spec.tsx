import Logotip from "module/common/component/display/Logos/Logotip/Logotip";
import { render } from "test-utils";

describe("Logotip tests", () => {
    test("Renders correctly", () => {
        const screen = render(<Logotip size={"sm"} />);
        const isotipIcon = screen.getByTestId("LogotipIcon");
        expect(isotipIcon.props.width).toEqual(103.62);
        expect(isotipIcon.props.height).toEqual(16.27);
    });
});

