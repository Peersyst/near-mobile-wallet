import InnerAssetSelect from "module/wallet/component/input/WalletAssetSelect/InnerAssetSelect/InnerAssetSelect";
import { render, waitFor, screen, translate } from "test-utils";
import { AccountBalanceMock, NftTokensMock, TokensMock, UseGetAllAssetsMock, UseServiceInstanceMock } from "test-mocks";
import { config } from "config";

describe("Test for the InnerAssetSelect component", () => {
    const { serviceInstance } = new UseServiceInstanceMock();

    test("Renders correctly", async () => {
        const { tokens } = new TokensMock({ length: 4 });
        const { nfts } = new NftTokensMock({ length: 4 });
        const accountBalance = new AccountBalanceMock();
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        jest.spyOn(serviceInstance, "getNfts").mockResolvedValue(nfts);
        jest.spyOn(serviceInstance, "getAccountTokens").mockResolvedValue(tokens);
        new UseGetAllAssetsMock({ isLoading: false });
        render(<InnerAssetSelect />);
        //NEAR Amount
        await waitFor(() =>
            expect(screen.getByText(translate("number", { val: accountBalance.available }) + " " + config.tokenName)).toBeDefined(),
        );
        //Tokens
        await waitFor(() =>
            expect(screen.getAllByText(translate("number", { val: tokens[0].balance }) + " " + tokens[0].metadata.symbol)).toHaveLength(
                tokens.length,
            ),
        );
        //NFTs
        await waitFor(() => expect(screen.getAllByText(nfts[0].metadata.title)).toHaveLength(nfts.length));
    });
});
