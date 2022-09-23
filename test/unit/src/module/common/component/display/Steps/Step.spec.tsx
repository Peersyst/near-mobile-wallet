import { render } from "test-utils";
import Steps from "module/common/component/display/Steps/Steps";

describe("Step", () => {
    test("Renders correctly", () => {
        const screen = render(<Steps index={0} length={3} />);
        expect(screen.getByText("1")).toBeDefined();
        expect(screen.getByText("/")).toBeDefined();
        expect(screen.getByText("3")).toBeDefined();
    });
});
