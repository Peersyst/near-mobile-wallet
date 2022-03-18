import { fireEvent, render } from "test-utils";
import { translate } from "locale";
import SettingsScreen from "module/settings/screen/SettingsScreen";
import * as Navigation from "@react-navigation/native";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";

describe("SettingsScreen tests", () => {
    test("Renders correctly", () => {
        const screen = render(<SettingsScreen navigation={jest.fn() as any} />);
        expect(screen.getByText(translate("settings"))).toBeDefined();
        expect(screen.getByText(translate("general_settings"))).toBeDefined();
        expect(screen.getByText(translate("security_settings"))).toBeDefined();
        expect(screen.getAllByTestId("ChevronRightIcon")).toHaveLength(2);
    });
    test("Navigates to the general settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<SettingsScreen navigation={jest.fn() as any} />);
        expect(screen.getByText(translate("settings"))).toBeDefined();
        const generalMenu = screen.getByText(translate("general_settings"));
        fireEvent.press(generalMenu);
        expect(mockedNavigation).toHaveBeenCalledWith(MainBottomScreens.GENERAL_SETTINGS);
    })
    test("Navigates to the security settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<SettingsScreen navigation={jest.fn() as any} />);
        expect(screen.getByText(translate("settings"))).toBeDefined();
        const securityMenu = screen.getByText(translate("security_settings"));
        fireEvent.press(securityMenu);
        expect(mockedNavigation).toHaveBeenCalledWith(MainBottomScreens.SECURITY_SETTINGS);
    })
});
