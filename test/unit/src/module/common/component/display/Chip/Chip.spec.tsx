import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import Chip from "module/common/component/display/Chip/Chip";

describe("Chip tests", () => {
    test("Renders correctly", () => {
        const screen = render(<Chip label="Peersyst" />);
        const chip = screen.getByText("Peersyst");
        expect(chip).toBeDefined();
    });
    test("onPress is called", () => {
        const onPress = jest.fn();
        const screen = render(<Chip onPress={onPress} label="Press me" />);
        const chip = screen.getByText("Press me");
        fireEvent.press(chip);
        expect(onPress).toHaveBeenCalled();
    });
});
