import { TokenSelectItem } from "module/wallet/component/input/WalletAssetSelect/InnerAssetSelect/TokenSelectItemlist";
import { AssetType } from "module/wallet/wallet.types";
import { TokenMock, UseAssetSelectMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";

describe("TokenSelectItemList test", () => {
    describe("TokenSelectItem test", () => {
        test("Renders correctly and setSelectedAsset correctly", async () => {
            const ft = new TokenMock();
            const { setSelectedAsset } = new UseAssetSelectMock();
            render(<TokenSelectItem token={ft} />);
            const balance = screen.getByText(translate("number", { val: ft.balance }) + " " + ft.metadata.symbol);
            expect(balance).toBeDefined();
            fireEvent.press(balance);
            expect(setSelectedAsset).toBeCalledWith({ type: AssetType.FT, ft });
        });
    });
    describe("TokenSelectItemList test", () => {});
});
