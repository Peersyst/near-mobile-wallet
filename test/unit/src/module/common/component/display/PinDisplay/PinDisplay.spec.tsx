import PinDisplay from "module/common/component/display/PinDisplay/PinDisplay";
import { render } from "test-utils";

describe("PinDisplay tests", () => {
    test("Renders correctly", () => {
        const screen = render(<PinDisplay length={0} />);
        expect(screen.getAllByTestId("FilledCircleIcon")).toHaveLength(4);
    });
});
