import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { render } from "test-utils";

describe("Keyboard test", () => {
    test("Keyboard renders correctly", () => {
        const screen = render(<NumericPad />);
        /*PASSWORD LAYOUT*/
        expect(screen.getAllByTestId("CircleIcon")).toHaveLength(4);

        /*KEYBOARD*/
        expect(screen.getByText("0"));
        expect(screen.getByText("1"));
        expect(screen.getByText("2"));
        expect(screen.getByText("3"));
        expect(screen.getByText("4"));
        expect(screen.getByText("5"));
        expect(screen.getByText("6"));
        expect(screen.getByText("7"));
        expect(screen.getByText("8"));
        expect(screen.getByText("9"));
        expect(screen.getByTestId("CrossIcon"));
        expect(screen.getByTestId("BackIcon"));
    });
});
