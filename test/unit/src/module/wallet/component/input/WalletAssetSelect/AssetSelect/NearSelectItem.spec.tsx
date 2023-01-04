import { config } from "config";
import NEARSelectItem from "module/wallet/component/input/WalletAssetSelect/InnerAssetSelect/NEARSelectItem";
import { AssetType } from "module/wallet/wallet.types";
import { UseGetBalanceMock, UseAssetSelectMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";

describe("NearSelectItem test", () => {
    test("Renders correctly and setAssetState correctly", async () => {
        const {
            balance: { available },
        } = new UseGetBalanceMock();

        const { setSelectedAsset } = new UseAssetSelectMock();
        render(<NEARSelectItem />);

        await waitFor(() => expect(screen.getByText(translate("number", { val: available }) + " " + config.tokenName)).toBeDefined());
        fireEvent.press(screen.getByText(translate("number", { val: available }) + " " + config.tokenName));
        expect(setSelectedAsset).toBeCalledWith({ type: AssetType.TOKEN });
    });
});
