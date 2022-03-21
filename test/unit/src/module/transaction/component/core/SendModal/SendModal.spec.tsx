import { render, SuccessApiCall } from "test-utils";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import * as UseWallet from "module/wallet/hook/useWallet";
import { cells } from "mocks/cells";
import { translate } from "locale";
import * as GetFee from "module/transaction/mock/getFee";

describe("SendModal tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWallet, "default").mockReturnValue({ state: { cells, selectedAccount: 0 } } as any);
        jest.spyOn(GetFee, "default").mockReturnValue(SuccessApiCall("10"));
        const screen = render(<SendModal />);
        expect(screen.getByText(translate("send"))).toBeDefined();
    });
});
