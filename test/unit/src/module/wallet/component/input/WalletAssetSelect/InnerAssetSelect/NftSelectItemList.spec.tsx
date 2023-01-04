import NftSelectItemList, { NftSelectItem } from "module/wallet/component/input/WalletAssetSelect/InnerAssetSelect/NftSelectItemList";
import { AssetType } from "module/wallet/wallet.types";
import { NftTokenMock, UseAssetSelectMock, UseGetNftsMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";

describe("NftSelectItemList test", () => {
    describe("NftSelectItem test", () => {
        test("Renders correctly and setSelectedAsset correctly", async () => {
            const nft = new NftTokenMock();
            const { setSelectedAsset } = new UseAssetSelectMock();
            render(<NftSelectItem nft={nft} />);
            const title = screen.getByText(nft.metadata.title);
            expect(title).toBeDefined();
            fireEvent.press(title);
            expect(setSelectedAsset).toBeCalledWith({ type: AssetType.NFT, nft });
        });
    });
    describe("NftSelectItemList test", () => {
        test("Renders the list correctly", async () => {
            const { nfts } = new UseGetNftsMock();
            render(<NftSelectItemList />);
            await waitFor(() => expect(screen.getByText(translate("nfts"))).toBeDefined());
            expect(screen.getAllByText(nfts[0].metadata.title)).toHaveLength(nfts.length);
        });
    });
});
