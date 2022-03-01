import BreadcrumbItem from "module/common/component/display/Breadcrumb/BreadcrumbItem/BreadcrumbItem";
import { theme } from "module/common/style/theme";
import { render } from "test-utils";

describe("Test for the BreadcrumbItem", () => {
    test("Renders correctly not active", () => {
        const screen = render(<BreadcrumbItem number={0} active={false} />);
        const number = screen.getByText("0");
        expect(number).toBeDefined();
        expect(number.props.style.color).toEqual(theme.palette.gray300);
    });
    test("Renders correctly active", () => {
        const screen = render(<BreadcrumbItem number={1} active={true} />);
        const number = screen.getByText("1");
        expect(number).toBeDefined();
        expect(number.props.style.color).toEqual(theme.palette.white);
    });
});
