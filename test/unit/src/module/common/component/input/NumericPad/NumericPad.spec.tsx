import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";

describe("Keyboard test", () => {
    test("Keyboard renders correctly", () => {
        const handleSubmit = jest.fn();
        const screen = render(<NumericPad onSubmit={handleSubmit} placeholder="Placeholder" />);

        expect(screen.getByText("PLACEHOLDER"));

        fireEvent.press(screen.getByText("0"));
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));

        expect(handleSubmit).toHaveBeenCalled();
    });
});
