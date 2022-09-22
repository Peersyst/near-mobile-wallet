import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

describe("Test for the Navbar", () => {
    test("Renders correctly with title & back", () => {
        const screen = render(<Navbar back title="Info" />);
        expect(screen.getByText("Info"));
        expect(screen.getByTestId("BackIcon"));
    });
    test("Renders correctly with pagination", () => {
        const screen = render(<Navbar back title="Info" length={3} index={0} />);
        expect(screen.getByText("Info"));
        expect(screen.getByTestId("BackIcon"));
        expect(screen.getByText("1 /"));
        expect(screen.getByText("3"));
    });
    test("Go back click works correctly", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ canGoBack: mockedNavigation });
        const screen = render(<Navbar back />);
        const icon = screen.getByTestId("BackIcon");
        fireEvent.press(icon);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
