import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import Chip from "module/common/component/display/Chip/Chip";
import lightTheme from "config/theme/lightTheme";

describe("Chip tests", () => {
    test("Renders correctly", () => {
        const screen = render(<Chip label="Peersyst" />);
        const chip = screen.getByText("Peersyst");
        expect(chip).toBeDefined();
        expect(chip.props.style.color).toEqual(lightTheme.palette.darkFont);
    });
    test("Renders dark variant correctly", () => {
        const screen = render(<Chip label="Peersyst" appearance="dark" />);
        const chip = screen.getByText("Peersyst");
        expect(chip.props.style.color).toEqual(lightTheme.palette.white);
    });
    test("Renders fullWidth correctly", () => {
        const screen = render(<Chip label="Peersyst" fullWidth />);
        const chipRoot = screen.getByTestId("chipRoot");
        expect(chipRoot.props.style.alignSelf).not.toEqual("flex-start");
    });
    test("onPress is called", () => {
        const onPress = jest.fn();
        const screen = render(<Chip onPress={onPress} label="Press me" />);
        const chip = screen.getByText("Press me");
        fireEvent.press(chip);
        expect(onPress).toHaveBeenCalled();
    });
});
