import * as UseWallet from "module/wallet/hook/useWallet";
import { cells } from "mocks/cells";
import { render } from "test-utils";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { translate } from "locale";

describe("ReceiveModal tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWallet, "default").mockReturnValue({ state: { cells, selectedAccount: 0 } } as any);
        const screen = render(<ReceiveModal />);
        expect(screen.getByText(translate("receive"))).toBeDefined();
        expect(screen.getByTestId("QRCode")).toBeDefined();
        expect(screen.getByText(translate("receive_info"))).toBeDefined();
    });
});
