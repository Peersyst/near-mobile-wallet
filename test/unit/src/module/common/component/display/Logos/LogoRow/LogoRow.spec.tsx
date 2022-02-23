import LogoRow from "module/common/component/display/Logos/LogoRow/LogoRow";
import { render } from "test-utils";
import { theme } from "module/common/style/theme";

describe("LogoRow test", ()=> {
    test("Renders correctly", ()=> {
        const screen = render(<LogoRow />)
        const isotipIcon = screen.getByTestId("LogotipIcon");
        expect(isotipIcon.props.width).toEqual(133.62);
        expect(isotipIcon.props.height).toEqual(20.99);
        expect(isotipIcon.props.width).toBeDefined();
        const isotip = screen.getByTestId("LogoIcon");
        expect(isotip.props.fill).toEqual(theme.palette.black);
    })
})
