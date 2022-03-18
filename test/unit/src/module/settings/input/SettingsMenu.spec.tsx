import SettingsMenu from "module/settings/components/input/SettingsMenu/SettingsMenu";
import { render, fireEvent } from "test-utils";
import * as Navigation from "@react-navigation/native";

describe("Test for the Settings Menu", () => {
    test("Renders correctly", () => {
        const screen = render(<SettingsMenu label={"Hello world"} location={"Login"} />);
        expect(screen.getByText("Hello world")).toBeDefined();
        expect(screen.getByTestId("ChevronRightIcon")).toBeDefined();
    });
    test("Navigates correctly", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<SettingsMenu label={"Hello world"} location={"Login"} />);
        const icon = screen.getByTestId("ChevronRightIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalledWith("Login");
    });
});
