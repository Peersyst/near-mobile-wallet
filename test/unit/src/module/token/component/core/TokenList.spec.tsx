import { token } from "mocks/tokens";
import TokensList from "module/token/component/core/TokensList/TokensList";
import { render, waitFor } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { translate } from "locale";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("Renders the token list properly", () => {
    const sdkInstance = new CKBSDKService(MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getTokensBalance").mockReturnValue([token]);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText("Wrapped BTC")));
    });
    test("Renders empty token list", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getTokensBalance").mockReturnValue([]);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show"))));
    });
});
