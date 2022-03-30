import ReceiveCard from "module/transaction/component/display/ReceiveCard/ReceiveCard";
import { fireEvent, render } from "test-utils";
import * as Clipboard from "expo-clipboard";
import * as UseToast from "module/common/component/base/feedback/ToastProvider/hooks/useToast";
import * as UseModal from "module/common/component/base/feedback/ModalProvider/hooks/useModal";
import * as UseSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { translate } from "locale";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { wallet } from "mocks/wallet";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

const ADDRESS_MOCK = "0xMockedAddress";

describe("Test for the receive Card", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        jest.spyOn(UseSelectedWallet, "default").mockReturnValue(wallet);
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue(ADDRESS_MOCK);
        const screen = render(<ReceiveCard />);
        expect(screen.getByText(ADDRESS_MOCK)).toBeDefined();
    });
    test("Copies address correctly", () => {
        jest.spyOn(UseSelectedWallet, "default").mockReturnValue(wallet);
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue(ADDRESS_MOCK);
        const showToast = jest.fn();
        jest.spyOn(UseToast, "useToast").mockReturnValue({ showToast, hideToast: jest.fn(), toastActive: false });
        jest.spyOn(Clipboard, "setString");
        const screen = render(<ReceiveCard />);
        const icon = screen.getByTestId("FilledCopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setString).toHaveBeenCalledWith(ADDRESS_MOCK);
        expect(showToast).toHaveBeenCalledWith(translate("address_copied"), { type: "success" });
    });
    test("Hides modal correctly", () => {
        const hideModal = jest.fn();
        jest.spyOn(UseSelectedWallet, "default").mockReturnValue(wallet);
        jest.spyOn(UseModal, "useModal").mockReturnValue({ hideModal } as any);
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue(ADDRESS_MOCK);
        const screen = render(<ReceiveCard />);
        expect(screen.getByText(ADDRESS_MOCK)).toBeDefined();
        const text = screen.getByText(translate("go_back"));
        expect(text).toBeDefined();
        expect(screen.getByTestId("BackIcon")).toBeDefined();
        fireEvent.press(text);
        expect(hideModal).toHaveBeenCalledWith(ReceiveModal.id);
    });
});
