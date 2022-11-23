import SettingsTouchableCard from "module/settings/components/input/SettingsTouchableCard/SettingsTouchableCard";
import { fireEvent, render } from "test-utils";
import { Text } from "react-native";

describe("Test for the settings touchable card", () => {
    test("Test for the settings touchable card", () => {
        const mockedOnPress = jest.fn();
        const screen = render(
            <SettingsTouchableCard onPress={mockedOnPress}>
                <Text>Text</Text>
            </SettingsTouchableCard>,
        );
        const txt = screen.getByText("Text");
        expect(txt).toBeDefined();
        fireEvent.press(txt);
        expect(mockedOnPress).toHaveBeenCalled();
    });
});
