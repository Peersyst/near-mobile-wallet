import BottomBarLogoItem from "module/common/component/navigation/BottomBar/BottomBarLogoItem/BottomBarLogoItem";
import { fireEvent, render } from "test-utils";

describe("Test for the BottomBarItem", () => {
    test("Renders correctly", () => {
        const mockedOnPress = jest.fn();
        const screen = render(<BottomBarLogoItem onPress={mockedOnPress} />);
        const button = screen.getByRole("imagebutton");
        expect(button).toBeDefined();
        fireEvent.press(button);
        expect(mockedOnPress).toHaveBeenCalled();
    });
});
