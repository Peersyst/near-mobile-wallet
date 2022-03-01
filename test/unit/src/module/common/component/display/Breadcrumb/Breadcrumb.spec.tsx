import Breadcrumb from "module/common/component/display/Breadcrumb/Breadcrumb";
import { theme } from "module/common/style/theme";
import { render } from "test-utils";

describe("Test of the breadcrumb correctly", () => {
    test("Renders correctly", () => {
        const screen = render(<Breadcrumb length={4} numberOfActive={2} />);
        const numberZero = screen.getByText("0");
        expect(numberZero).toBeDefined();
        expect(numberZero.props.style.color).toEqual(theme.palette.white);
        const numberTwo = screen.getByText("2");
        expect(numberTwo).toBeDefined();
        expect(numberTwo.props.style.color).toEqual(theme.palette.gray300);
    });
});
