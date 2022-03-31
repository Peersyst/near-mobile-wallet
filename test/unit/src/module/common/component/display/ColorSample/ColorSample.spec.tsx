import { render } from "test-utils";
import ColorSample from "module/common/component/display/ColorSample/ColorSample";
import { theme } from "module/common/style/theme";
import { fireEvent } from "@testing-library/react-native";

describe("ColorSample test", () => {
    test("Renders correctly", () => {
        const handlePress = jest.fn();
        const screen = render(<ColorSample color={theme.palette.primary} onPress={handlePress} />);
        const colorSample = screen.getByRole("button");
        fireEvent.press(colorSample);
        expect(handlePress).toHaveBeenCalledWith(theme.palette.primary);
    });
});
