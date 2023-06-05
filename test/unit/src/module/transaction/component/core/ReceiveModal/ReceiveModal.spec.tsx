import { fireEvent, render, screen, translate } from "test-utils";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { MOCKED_ADDRESS, UseServiceInstanceMock, UseShareMock, WalletStateMock } from "test-mocks";

describe("Test for the receive Modal", () => {
    beforeEach(() => {
        new UseServiceInstanceMock();
        new WalletStateMock();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        render(<ReceiveModal />);
        //Address
        expect(screen.getByText(MOCKED_ADDRESS)).toBeDefined();
        //Share btn
        expect(screen.getByRole("button", { name: translate("share") })).toBeDefined();
    });

    test("Calls share correctly", () => {
        const { share } = new UseShareMock();
        render(<ReceiveModal />);
        const btn = screen.getByRole("button", { name: translate("share") });
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(share).toHaveBeenCalled();
    });
});
