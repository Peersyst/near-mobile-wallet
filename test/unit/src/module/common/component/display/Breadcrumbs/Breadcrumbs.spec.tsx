import Breadcrumbs from "module/common/component/display/Breadcrumbs/Breadcrumbs";
import { render } from "test-utils";

describe("Test of the breadcrumb correctly", () => {
    test("Renders correctly", () => {
        const screen = render(<Breadcrumbs length={4} index={2} />);
        const numberZero = screen.getByText("1");
        expect(numberZero).toBeDefined();
        const numberTwo = screen.getByText("2");
        expect(numberTwo).toBeDefined();
    });
});
