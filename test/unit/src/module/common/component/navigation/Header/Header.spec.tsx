import Header from "module/common/component/navigation/Header/Header";
import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

describe("Header tests", () => {
    test("Renders correctly - withIcons", () => {
        const screen = render(<Header showIcons />);
        expect(screen.getByTestId("SettingsIcon"));
    });
    test("Goes to settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<Header showIcons />);
        const icon = screen.getByTestId("SettingsIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
