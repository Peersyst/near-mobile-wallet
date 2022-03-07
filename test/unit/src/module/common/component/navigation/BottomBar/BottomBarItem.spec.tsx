import { DAOIcon } from "icons";
import BottomBarItem from "module/common/component/navigation/BottomBar/BottomBarItem/BottomBarItem";
import { render, fireEvent } from "test-utils";

describe("Test for the BottomBarItem", () => {
    test("Renders correctly", () => {
        const mockedOnPress = jest.fn();
        const screen = render(<BottomBarItem onPress={mockedOnPress} isActive={false} Icon={<DAOIcon />} label={"DAO"} />);
        expect(screen.getByText("DAO")).toBeDefined();
        const icon = screen.getByTestId("DAOIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(mockedOnPress).toHaveBeenCalled();
    });
});
