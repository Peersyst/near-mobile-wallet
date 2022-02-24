import Keyboard from "module/common/component/input/Keyboard/Keyboard";
import { fireEvent, render } from "test-utils";

describe("Keyboard test", () => {
    test("Keyboard renders correctly", () => {
        const screen = render(<Keyboard setValue={() => ""} />);
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

    test("onPress is called", () => {
        const onPress = jest.fn();
        const screen = render(<Keyboard setValue={onPress} />);
        const padItem = screen.getByTestId("CrossIcon");
        fireEvent.press(padItem);
        expect(onPress).toHaveBeenCalled();
    });
});
