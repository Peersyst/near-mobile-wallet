import * as UseSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { render } from "test-utils";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { translate } from "locale";
import { wallet } from "mocks/wallet";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("ReceiveModal tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseSelectedWallet, "default").mockReturnValue(wallet);
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue("0xMockedAddress");
        const screen = render(<ReceiveModal />);
        expect(screen.getByText(translate("receive"))).toBeDefined();
        expect(screen.getByTestId("QRCode")).toBeDefined();
        expect(screen.getByText(translate("receive_info"))).toBeDefined();
    });
});
