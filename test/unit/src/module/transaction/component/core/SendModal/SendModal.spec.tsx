import { render } from "test-utils";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import * as UseWallet from "module/wallet/hook/useWallet";
import { cells } from "mocks/cells";
import { translate } from "locale";

describe("SendModal tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWallet, "default").mockReturnValue({ state: { cells, selectedAccount: 0 } } as any);
        const screen = render(<SendModal />);
        expect(screen.getByText(translate("send"))).toBeDefined();
    });
});
