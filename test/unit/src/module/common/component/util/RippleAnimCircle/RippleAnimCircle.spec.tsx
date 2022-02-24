import RippleAnimCircle from "module/common/component/util/RippleAnimCircle/RippleAnimCircle";
import { fireEvent, render } from "test-utils";

describe("RippleAnimCircle tests", () => {
    test("Renders ripple animation correctly", () => {
        const screen = render(<RippleAnimCircle />);
        expect(screen.getByTestId("rippleAnim")).toBeDefined();
    });
    test("onPress is called", () => {
        const onPress = jest.fn();
        const screen = render(<RippleAnimCircle onPress={onPress} />);
        const rippleRoot = screen.getByTestId("rippleAnim");
        fireEvent.press(rippleRoot);
        expect(onPress).toHaveBeenCalled();
    });
});
