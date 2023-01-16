import { config } from "config";
import WalletAssetSelect from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect";
import { AccountBalanceMock, TokensMock, UseGetAllAssetsMock, UseServiceInstanceMock } from "test-mocks";
import { render, screen, translate, fireEvent, waitFor } from "test-utils";

describe("WalletAssetSelect test", () => {
    const { serviceInstance } = new UseServiceInstanceMock();
    test("Renders correctly and setAssetState correctly", async () => {
        const mockedOnChange = jest.fn();
        new UseGetAllAssetsMock({ isLoading: false });
        const { tokens } = new TokensMock({ length: 4 });
        const accountBalance = new AccountBalanceMock();
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        jest.spyOn(serviceInstance, "getAccountTokens").mockResolvedValue(tokens);
        render(<WalletAssetSelect onChange={mockedOnChange} index={0} />);
        //Display placeholder by default
        const placeholder = screen.getByText(translate("select_asset"));
        expect(placeholder).toBeDefined();

        //Opens modal
        fireEvent.press(placeholder);
        expect(screen.getByText(translate("choose_what_to_send"))).toBeDefined();
        //Selects a token as an asset

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
        const ft = screen.getAllByText(translate("number", { val: tokens[0].balance }) + " " + tokens[0].metadata.symbol)[0];
        //Onchange is called with the selected asset
        fireEvent.press(ft);
        expect(mockedOnChange).toHaveBeenCalled();
    });
});
