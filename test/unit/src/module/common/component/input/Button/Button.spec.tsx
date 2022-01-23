import Button from "module/common/component/input/Button/Button";
import { render } from "test-utils";
import { Text } from "react-native";
import { fireEvent } from "@testing-library/react-native";

describe("Button tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <Button>
                <Text>Press me</Text>
            </Button>,
        );

        expect(screen.getByText("Press me")).toBeDefined();
    });
    test("onPress is called", () => {
        const onPress = jest.fn();
        const screen = render(
            <Button onPress={onPress}>
                <Text>Press me</Text>
            </Button>,
        );

        const button = screen.getByText("Press me");
        fireEvent.press(button);
        expect(onPress).toHaveBeenCalled();
    });
});
