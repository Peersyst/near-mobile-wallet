import ReceiveCard from "module/transaction/component/display/ReceiveCard/ReceiveCard";
import { fireEvent, render } from "test-utils";
import { cells } from "mocks/cells";
import * as Clipboard from "expo-clipboard";
import * as UseToast from "module/common/component/base/feedback/ToastProvider/hooks/useToast";
import * as UseModal from "module/common/component/base/feedback/ModalProvider/hooks/useModal";
import * as UseWallet from "module/wallet/hook/useWallet";
import { translate } from "locale";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";

describe("Test for the receive Card", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        jest.spyOn(UseWallet, "default").mockReturnValue({ state: { cells, selectedAccount: 0 } } as any);
        const screen = render(<ReceiveCard />);
        expect(screen.getByText(cells[0].address)).toBeDefined();
    });
    test("Copies address correctly", () => {
        jest.spyOn(UseWallet, "default").mockReturnValue({ state: { cells, selectedAccount: 0 } } as any);
        const showToast = jest.fn();
        jest.spyOn(UseToast, "useToast").mockReturnValue({ showToast, hideToast: jest.fn(), toastActive: false });
        jest.spyOn(Clipboard, "setString");
        const screen = render(<ReceiveCard />);
        const icon = screen.getByTestId("FilledCopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setString).toHaveBeenCalledWith(cells[0].address);
        expect(showToast).toHaveBeenCalledWith(translate("address_copied"), { type: "success" });
    });
    test("Hides modal correctly", () => {
        const hideModal = jest.fn();
        jest.spyOn(UseWallet, "default").mockReturnValue({ state: { cells, selectedAccount: 0 } } as any);
        jest.spyOn(UseModal, "useModal").mockReturnValue({ hideModal } as any);
        const screen = render(<ReceiveCard />);
        expect(screen.getByText(cells[0].address)).toBeDefined();
        const text = screen.getByText(translate("go_back"));
        expect(text).toBeDefined();
        expect(screen.getByTestId("BackIcon")).toBeDefined();
        fireEvent.press(text);
        expect(hideModal).toHaveBeenCalledWith(ReceiveModal.id);
    });
});
