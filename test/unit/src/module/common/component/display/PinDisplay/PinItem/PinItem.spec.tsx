import PinItem from "module/common/component/display/PinDisplay/PinItem/PinItem";
import { render } from "test-utils";

describe("PinItem tests", () => {
    test("Renders correctly", () => {
        const screen = render(<PinItem active={true} />);
        expect(screen.getByTestId("FilledCircleIcon"));
    });
});
