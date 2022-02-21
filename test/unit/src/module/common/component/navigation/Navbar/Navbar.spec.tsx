import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";

describe("Test for the Navbar", () => {
    test("Renders correctly text variant", () => {
        const screen = render(<Navbar back title="Info" />);
        expect(screen.getByText("Info"));
        expect(screen.getByTestId("BackIcon"));
    });
    test("Renders correctly logo variant", () => {
        const screen = render(<Navbar withIcon />);
        expect(screen.getByText("BULL"));
    });
    test("Go back click works correctly", () => {
        const mockedNavigation = jest.fn();
        jest.mock("@react-navigation/native", () => {
            return {
                useNavigation: () => ({
                    navigate: mockedNavigation,
                }),
            };
        });
        const screen = render(<Navbar withIcon back />);
        const icon = screen.getByTestId("BackIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
