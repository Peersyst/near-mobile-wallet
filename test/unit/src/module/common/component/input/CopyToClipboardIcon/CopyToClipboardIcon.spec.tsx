import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import { fireEvent, render } from "test-utils";
import * as Clipboard from "expo-clipboard";
import * as Genesys from "@peersyst/react-native-components";

describe("Test for the copy to clipboard", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const showToast = jest.fn();
        jest.spyOn(Genesys, "useToast").mockReturnValue({ showToast, hideToast: jest.fn(), toastActive: false });
        jest.spyOn(Clipboard, "setStringAsync");
        const screen = render(<CopyToClipboardIcon text={"Peersyst4thewin"} toastMessage="Copied" />);
        const icon = screen.getByTestId("CopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setStringAsync).toHaveBeenCalledWith("Peersyst4thewin");
        expect(showToast).toHaveBeenCalledWith("Copied", { type: "success" });
    });
    test("Renders correctly filled mode", () => {
        const screen = render(<CopyToClipboardIcon filled text={"A"} toastMessage="A" />);
        expect(screen.getByTestId("FilledCopyIcon")).toBeDefined();
    });
});
