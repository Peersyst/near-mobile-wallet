import PadItem from "module/common/component/input/PadItem/PadItem";
import { fireEvent, render } from "test-utils";

describe("Paditem test", () => {
    test("Renders PadItem with a number correctly", () => {
        const screen = render(<PadItem item={"2"} onPress={() =>"test"} />);
        expect(screen.getByText("2"));
    
    });
    test("Renders PadItem with an icon correctly", () => {
        const screen = render(<PadItem item={"X"} onPress={() =>"test"}/>)
        expect(screen.getByTestId("CrossIcon"));
    });
    test("onPress is called", () => {
        const onPress = jest.fn();
        const screen = render(<PadItem item={"X"} onPress={onPress}/>);
        const padItem = screen.getByTestId("CrossIcon");
        fireEvent.press(padItem);
        expect(onPress).toHaveBeenCalled();
    });
});