import { config } from "config";
import { WalletAssetSelectModal } from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelectModal/WalletAssetSelectModal";
import { UseGetAllAssetsMock, UseGetBalanceMock } from "test-mocks";
import { render, screen, translate, waitFor } from "test-utils";

describe("WalletAssetSelectModal", () => {
    test("Renders without assets and calls on press fn", async () => {
        const hideModalMock = jest.fn();
        new UseGetAllAssetsMock({ isLoading: false });
        const {
            balance: { available },
        } = new UseGetBalanceMock();
        render(<WalletAssetSelectModal hideModal={hideModalMock} />);
        //Navbar
        expect(screen.getByText(translate("choose_what_to_send"))).toBeDefined();
        //InnerAssetSelect
        await waitFor(() => expect(screen.getByText(translate("number", { val: available }) + " " + config.tokenName)).toBeDefined());
    });
});
