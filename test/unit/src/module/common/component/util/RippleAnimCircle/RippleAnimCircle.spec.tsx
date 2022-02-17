import RippleAnimCircle from "module/common/component/util/RippleAnimCircle/RippleAnimCircle";
import { render } from "test-utils";

describe("RippleAnimCircle tests", () => {
    test("Renders ripple animation correctly", () => {
        const screen = render(<RippleAnimCircle />);
        const chipRoot = screen.getByTestId("rippleAnim");
        expect(chipRoot).toBeDefined();
    });
    
});
