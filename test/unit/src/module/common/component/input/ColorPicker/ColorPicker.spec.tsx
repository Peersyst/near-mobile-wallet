import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import ColorPicker from "module/wallet/component/input/ColorPicker/ColorPicker";

describe("ColorPicker tests", () => {
    test("Renders correctly", () => {
        const handlePick = jest.fn();
        const screen = render(<ColorPicker onColorPicked={handlePick} />);
        const samples = screen.getAllByRole("button");
        fireEvent.press(samples[0]);
        expect(handlePick).toHaveBeenCalled();
    });
});
