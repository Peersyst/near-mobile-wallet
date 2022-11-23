import TokensList from "module/token/component/core/TokensList/TokensList";
import { render, translate, waitFor } from "test-utils";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { token } from "mocks/tokens";

describe("Renders the token list properly", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseServiceInstanceMock();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(serviceInstance, "getTokensBalance").mockResolvedValue([token]);
        const screen = render(<TokensList />);
        expect(await screen.findAllByText(token.type.name)).toHaveLength(1);
    });

    test("Renders empty token list", async () => {
        jest.spyOn(serviceInstance, "getTokensBalance").mockResolvedValue([]);
        const screen = render(<TokensList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show", { ns: "error" }))));
    });
});
