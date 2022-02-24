import PinItem from "module/common/component/display/PinDisplay/PinItem/PinItem";
import { render } from "test-utils";

describe("Button tests", () => {
    test("Renders password active (filled) circle correctly", () => {
        const screen = render(<PinItem active={true} animationHeight={1} duration={1} />);
        expect(screen.getByTestId("FilledCircleIcon"));
    });
    test("Renders password no-active circle correctly", () => {
        const screen = render(<PinItem active={false} animationHeight={1} duration={1} />);
        expect(screen.getByTestId("CircleIcon"));
    });
});
