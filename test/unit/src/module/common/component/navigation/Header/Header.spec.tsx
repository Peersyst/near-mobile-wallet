import Header from "module/common/component/navigation/Header/Header";
import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

describe("Header tests", () => {
    test("Renders correctly - withIcons", () => {
        const screen = render(<Header />);
        const images = screen.getAllByRole("image");
        expect(images.length).toBe(2);
        expect(images[0].props.testID).toBe("LinearBgLogo");
        expect(images[1].props.testID).toBe("SettingsIcon");
    });
    test("Goes to settings", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<Header />);
        const icon = screen.getByTestId("SettingsIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
