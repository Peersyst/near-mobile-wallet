import TokensList from "module/token/component/core/TokensList/TokensList";
import { render, waitFor } from "test-utils";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { newToken } from "mocks/tokens";

describe("Renders the token list properly", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseGetServiceInstanceMock();

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        //TODO: remove this comment in NEAR and update mock in CKBUll
        jest.spyOn(serviceInstance, "getTokensBalance").mockResolvedValue([newToken as any]);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText("Bitcoin")));
    });

    // IGNORED WHILE MOCKED
    /* test("Renders empty token list", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getTokensBalance").mockReturnValue([]);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show", { ns: "error" }))));
    });*/
});
