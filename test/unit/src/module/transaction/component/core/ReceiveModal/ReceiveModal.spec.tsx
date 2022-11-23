import { fireEvent, render, translate } from "test-utils";
import * as Clipboard from "expo-clipboard";
import * as Genesys from "@peersyst/react-native-components";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { MOCKED_ADDRESS, UseServiceInstanceMock, WalletStateMock } from "test-mocks";

describe("Test for the receive Modal", () => {
    beforeEach(() => {
        new UseServiceInstanceMock();
        new WalletStateMock();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<ReceiveModal />);
        expect(screen.getByText(MOCKED_ADDRESS)).toBeDefined();
    });
    test("Copies address correctly", () => {
        const showToast = jest.fn();
        jest.spyOn(Genesys, "useToast").mockReturnValue({ showToast, hideToast: jest.fn(), toastActive: false });
        jest.spyOn(Clipboard, "setString");
        const screen = render(<ReceiveModal />);
        const button = screen.getByText(translate("copy"));
        expect(button).toBeDefined();
        fireEvent.press(button);
        expect(Clipboard.setString).toHaveBeenCalledWith(MOCKED_ADDRESS);
        expect(showToast).toHaveBeenCalledWith(translate("address_copied"), { type: "success" });
    });
});
