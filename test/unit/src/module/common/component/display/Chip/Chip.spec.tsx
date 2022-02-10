import { render } from "test-utils";
import { Text } from "react-native";
import { fireEvent } from "@testing-library/react-native";
import Chip from "module/common/component/display/Chip/Chip";
describe("Chip tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <Chip label="Press me"/>,
        );

        expect(screen.getByText("Press me")).toBeDefined();
    });
    test("onPress is called", () => {
        const onPress = jest.fn();
        const screen = render(
            <Chip onPress={onPress} label="Press me"/>
        );

        const button = screen.getByText("Press me");
        fireEvent.press(button);
        expect(onPress).toHaveBeenCalled();
    });
});
