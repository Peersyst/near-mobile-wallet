import { tokens } from "mocks/tokens";
import TokensList from "module/token/component/core/TokensList/TokensList";
import { render, waitFor } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { translate } from "locale";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";

describe("Renders the token list properly", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CKBSDKService.prototype, "getTokensBalance").mockReturnValue(tokens);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText("Wrapped USDC")));
    });
    test("Renders empty token list", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CKBSDKService.prototype, "getTokensBalance").mockReturnValue([]);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_currencies"))));
    });
});
