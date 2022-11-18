import TokensList from "module/token/component/core/TokensList/TokensList";
import { render, translate, waitFor } from "test-utils";
import { TokensMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Renders the token list properly", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseServiceInstanceMock();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const { tokens } = new TokensMock();
        jest.spyOn(serviceInstance, "getAccountTokens").mockResolvedValue(tokens);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText("Bitcoin")));
    });

    test("Renders empty token list", async () => {
        jest.spyOn(serviceInstance, "getAccountTokens").mockResolvedValue([]);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show", { ns: "error" }))));
    });
});
