import { fireEvent, render, translate } from "test-utils";
import SettingsScreen from "module/settings/screen/SettingsScreen";
import * as ReactNavigation from "@react-navigation/native";
import { SettingsScreens } from "module/settings/components/navigation/SettingsNavigatorGroup/SettingsNavigatorGroup";

describe("SettingsScreen tests", () => {
    test("Renders correctly", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(ReactNavigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<SettingsScreen />);
        expect(screen.getByText(translate("settings"))).toBeDefined();
        expect(screen.getByText(translate("general_settings"))).toBeDefined();
        expect(screen.getByText(translate("security_settings"))).toBeDefined();
        expect(screen.getAllByTestId("ChevronRightIcon")).toHaveLength(2);
    });

    test("Navigates to the general settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(ReactNavigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<SettingsScreen />);
        expect(screen.getByText(translate("settings"))).toBeDefined();
        const generalMenu = screen.getByText(translate("general_settings"));
        fireEvent.press(generalMenu);
        expect(mockedNavigation).toHaveBeenCalledWith(SettingsScreens.GENERAL_SETTINGS);
    });

    test("Navigates to the security settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(ReactNavigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<SettingsScreen />);
        expect(screen.getByText(translate("settings"))).toBeDefined();
        const securityMenu = screen.getByText(translate("security_settings"));
        fireEvent.press(securityMenu);
        expect(mockedNavigation).toHaveBeenCalledWith(SettingsScreens.SECURITY_SETTINGS);
    });
});
