import { DatabaseIcon } from "icons";
import BottomBarItem from "module/common/component/navigation/BottomBar/BottomBarItem/BottomBarItem";
import { render, fireEvent } from "test-utils";

describe("Test for the BottomBarItem", () => {
    test("Renders correctly", () => {
        const mockedOnPress = jest.fn();
        const screen = render(<BottomBarItem onPress={mockedOnPress} isActive={false} Icon={<DatabaseIcon />} label={"Staking"} />);
        expect(screen.getByText("Staking")).toBeDefined();
        const icon = screen.getByTestId("DatabaseIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(mockedOnPress).toHaveBeenCalled();
    });
});
