import PinDisplay from "module/common/component/display/PinDisplay/PinDisplay";
import { render } from "test-utils";

describe("Button tests", () => {
    test("Renders all 4 password empty circles", () => {
        const screen = render(<PinDisplay length={0} />);
        expect(screen.getAllByTestId("CircleIcon")).toHaveLength(4);
    });
    test("Renders password 2 filled and 2 empty", () => {
        const screen = render(<PinDisplay length={2} />);
        expect(screen.getAllByTestId("FilledCircleIcon")).toHaveLength(2);
        expect(screen.getAllByTestId("CircleIcon")).toHaveLength(2);
    });
    test("Renders all 4 password filled circle", () => {
        const screen = render(<PinDisplay length={4} />);
        expect(screen.getAllByTestId("FilledCircleIcon")).toHaveLength(4);
    });
});
