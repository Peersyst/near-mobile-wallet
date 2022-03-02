import Breadcrumb from "module/common/component/display/Breadcrumb/Breadcrumb";
import { render } from "test-utils";

describe("Test of the breadcrumb correctly", () => {
    test("Renders correctly", () => {
        const screen = render(<Breadcrumb length={4} numberOfActive={2} />);
        const numberZero = screen.getByText("1");
        expect(numberZero).toBeDefined();
        const numberTwo = screen.getByText("2");
        expect(numberTwo).toBeDefined();
    });
});
