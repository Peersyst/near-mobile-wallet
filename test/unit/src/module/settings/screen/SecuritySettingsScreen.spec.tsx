import { translate } from "locale";
import { MainScreens } from "module/main/MainNavigatorGroup";
import SecuritySettingsScreen from "module/settings/screen/SecuritySettingsScreen";
import { fireEvent, render } from "test-utils";

describe("Test for the SecuritySettingsScreen", () => {
    test("Renders correctly", () => {
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        expect(screen.getByText(translate("change_passcode")));
    });
    test("Navigate to confirm password", () => {
        const mockedNavigate = jest.fn();
        const mockedNavigation = {
            navigate: mockedNavigate,
        };
        const screen = render(<SecuritySettingsScreen navigation={mockedNavigation as any} />);
        const button = screen.getByText(translate("change_passcode"));
        fireEvent.press(button);
        expect(mockedNavigate).toHaveBeenCalledWith(MainScreens.UPDATE_PIN);
    });
});
