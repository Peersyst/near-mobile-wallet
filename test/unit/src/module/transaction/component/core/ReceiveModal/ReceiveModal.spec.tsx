import { fireEvent, render, translate } from "test-utils";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { MOCKED_ADDRESS, UseServiceInstanceMock, WalletStateMock } from "test-mocks";
import * as UseCopyToClipboard from "module/common/hook/useCopyToClipboard";

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
        const mockedCopy = jest.fn();
        jest.spyOn(UseCopyToClipboard, "useCopyToClipboard").mockReturnValue(mockedCopy);
        const screen = render(<ReceiveModal />);
        const button = screen.getByText(translate("copy"));
        expect(button).toBeDefined();
        fireEvent.press(button);
        expect(mockedCopy).toHaveBeenCalledWith({ message: MOCKED_ADDRESS, toastMessage: translate("address_copied") });
    });
});
