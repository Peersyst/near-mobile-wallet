import BreadcrumbItem from "module/common/component/display/Breadcrumbs/BreadcrumbItem/BreadcrumbItem";
import { render } from "test-utils";
import lightTheme from "config/theme/lightTheme";

describe("Test for the BreadcrumbItem", () => {
    test("Renders correctly not active", () => {
        const screen = render(<BreadcrumbItem number={0} active={false} />);
        const number = screen.getByText("0");
        expect(number).toBeDefined();
    });
    test("Renders correctly active", () => {
        const screen = render(<BreadcrumbItem number={1} active={true} />);
        const number = screen.getByText("1");
        expect(number).toBeDefined();
        expect(number.props.style.color).toEqual(lightTheme.palette.white);
    });
});
