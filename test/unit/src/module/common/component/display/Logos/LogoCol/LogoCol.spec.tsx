import LogoCol from "module/common/component/display/Logos/LogoCol/LogoCol";
import { render } from "test-utils";
import { theme } from "module/common/style/theme";

describe("LogoCol test", () => {
    test("Renders correctly -> medium + dark", () => {
        const screen = render(<LogoCol size={"md"} />);
        const isotipIcon = screen.getByTestId("LogotipIcon");
        expect(isotipIcon.props.width).toEqual(103.62);
        expect(isotipIcon.props.height).toEqual(16.27);
        const isotip = screen.getByTestId("LogoIcon");
        expect(isotip.props.fill).toEqual(theme.palette.black);
        expect(isotip.props.width).toEqual(103.61);
    });
    test("Renders correctly -> large + light ", () => {
        const screen = render(<LogoCol size={"lg"} appearance={"light"} />);
        const isotipIcon = screen.getByTestId("LogotipIcon");
        expect(isotipIcon.props.width).toEqual(165.42);
        expect(isotipIcon.props.height).toEqual(25.99);
        const isotip = screen.getByTestId("LogoIcon");
        expect(isotip.props.fill).toEqual(theme.palette.white);
        expect(isotip.props.width).toEqual(165.43);
    });
});
