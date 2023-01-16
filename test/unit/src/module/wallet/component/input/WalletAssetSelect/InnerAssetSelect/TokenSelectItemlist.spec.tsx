import { TokenSelectItem } from "module/wallet/component/input/WalletAssetSelect/InnerAssetSelect/TokenSelectItemList/TokenSelectItem";
import TokenSelectItemlist from "module/wallet/component/input/WalletAssetSelect/InnerAssetSelect/TokenSelectItemList/TokenSelectItemlist";
import { AssetType } from "module/wallet/wallet.types";
import { TokenMock, UseAssetSelectMock, UseGetTokensMock } from "test-mocks";
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
    describe("TokenSelectItemList test", () => {
        test("Renders the list correctly", async () => {
            const { fts } = new UseGetTokensMock();
            const ft = fts[0];
            render(<TokenSelectItemlist />);
            await waitFor(() =>
                expect(screen.getAllByText(translate("number", { val: ft.balance }) + " " + ft.metadata.symbol)).toHaveLength(fts.length),
            );
        });
    });
});
