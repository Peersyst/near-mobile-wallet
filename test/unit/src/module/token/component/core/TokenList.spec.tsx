import { tokens } from "mocks/tokens";
import TokensList from "module/token/component/core/TokensList/TokensList";
import { render, SuccessApiCall, waitFor } from "test-utils";
import * as UseWallet from "module/wallet/hook/useWallet";
import * as GetTokens from "module/token/mock/getTokens";
import { translate } from "locale";
import { mockedUseWallet } from "mocks/useWallet";

describe("Renders the token list properly", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWallet, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetTokens, "default").mockReturnValue(SuccessApiCall(tokens));
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText("SUDT")));
        expect(screen.getByText("10")).toBeDefined();
        expect(screen.getByText("21")).toBeDefined();
    });
    test("Renders empty token list", async () => {
        jest.spyOn(UseWallet, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetTokens, "default").mockReturnValue(SuccessApiCall([]));
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_currencies"))));
    });
});
