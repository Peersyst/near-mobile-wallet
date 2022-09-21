import { render } from "test-utils";
import ColorSample from "module/common/component/display/ColorSample/ColorSample";
import { fireEvent } from "@testing-library/react-native";
import lightTheme from "config/theme/lightTheme";

describe("ColorSample test", () => {
    test("Renders correctly", () => {
        const handlePress = jest.fn();
        const screen = render(<ColorSample color={lightTheme.palette.primary} onPress={handlePress} />);
        const colorSample = screen.getByRole("button");
        fireEvent.press(colorSample);
        expect(handlePress).toHaveBeenCalledWith(lightTheme.palette.primary);
    });
});
