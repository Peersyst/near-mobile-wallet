import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import { fireEvent, render } from "test-utils";
import { Clipboard } from "react-native";

describe("Test for the copy to clipboard", () => {
    test("Renders correctly", () => {
        jest.spyOn(Clipboard, "setString");
        const screen = render(<CopyToClipboardIcon text={"Peersyst4thewin"} />);
        const icon = screen.getByTestId("CopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setString).toHaveBeenCalledWith("Peersyst4thewin");
    });
});
