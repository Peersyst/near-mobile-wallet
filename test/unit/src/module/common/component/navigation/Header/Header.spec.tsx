import Header from "module/common/component/navigation/Header/Header";
import { theme } from "module/common/style/theme";
import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

describe("Header tests", () => {
    test("Renders correctly - Light Appearance", () => {
        const screen = render(<Header appearance={"light"} />);
        const isotip = screen.getByTestId("LogoIcon");
        expect(isotip.props.fill).toEqual(theme.palette.black);
    });
    test("Renders correctly - Dark Appearance + withIcons", () => {
        const screen = render(<Header showIcons />);
        expect(screen.getByTestId("NotificationIcon"));
        expect(screen.getByTestId("SettingsIcon"));
        expect(screen.getByTestId("activeCircle"));
        const isotip = screen.getByTestId("LogoIcon");
        expect(isotip.props.fill).toEqual(theme.palette.white);
    });
    test("Goes to settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<Header showIcons />);
        const icon = screen.getByTestId("SettingsIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalled();
    });
    test("Goes to notification", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<Header showIcons />);
        const icon = screen.getByTestId("NotificationIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
