import Isotip from "module/common/component/display/Logos/Isotip/Isotip";
import { render } from "test-utils";
import { theme } from "module/common/style/theme";

describe("Isotip tests", () => {
    test("Renders correctly -> light mode", () => {
        const screen = render(<Isotip size={"sm"} appearance={"light"} />);
        const isotip = screen.getByTestId("LogoIcon");
        expect(isotip.props.fill).toEqual(theme.palette.white);
    });
    test("Renders correctly -> dark mode", () => {
        const screen = render(<Isotip size={"sm"} appearance={"dark"} />);
        const isotip = screen.getByTestId("LogoIcon");
        expect(isotip.props.fill).toEqual(theme.palette.black);
    });
});
