import { PressableText } from "@peersyst/react-native-components";
import { fireEvent, render } from "test-utils";

describe("Test for the Pressable Text", () => {
    test("Renders correctly", () => {
        const mocked = jest.fn();
        const screen = render(
            <PressableText variant="body3Regular" onPress={mocked}>
                Hello world!
            </PressableText>,
        );
        const text = screen.getByText("Hello world!");
        expect(text).toBeDefined;
        fireEvent.press(text);
        expect(mocked).toHaveBeenCalled();
    });
});
