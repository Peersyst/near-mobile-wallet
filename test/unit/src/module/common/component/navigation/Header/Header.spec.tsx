import Header from "module/common/component/navigation/Header/Header";
import { theme } from "module/common/style/theme";
import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

describe("Notifications tests", () => {
    test("Renders correctly - Light Appearance", () => {
        const screen = render(<Header appearance={"light"} />);
        const Logo = screen.getByText("BULL");
        expect(Logo.props.style.color).toEqual(theme.palette.white);
    });
    test("Renders correctly - Dark Appearance", () => {
        const screen = render(<Header showIcons />);
        expect(screen.getByTestId("NotificationIcon"));
        expect(screen.getByTestId("SettingsIcon"));
        expect(screen.getByTestId("activeCircle"));
        const Logo = screen.getByText("BULL");
        expect(Logo.props.style.color).toEqual(theme.palette.black);
    });
    test("Goes to settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<Header showIcons />);
        const icon = screen.getByTestId("SettingsIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalled();
    });
    test("Goes to settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<Header showIcons />);
        const icon = screen.getByTestId("NotificationIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
