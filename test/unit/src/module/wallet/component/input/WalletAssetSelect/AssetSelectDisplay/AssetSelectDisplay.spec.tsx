import { config } from "config";
import AssetSelectDisplay from "module/wallet/component/input/WalletAssetSelect/AssetSelectDisplay/AssetSelectDisplay";
import { AssetType } from "module/wallet/wallet.types";
import { AssetMock, NftTokenMock, TokenMock, UseAssetSelectMock, UseGetBalanceMock } from "test-mocks";
import { fireEvent, render, screen, waitFor, translate } from "test-utils";

describe("AssetSelectDisplay test", () => {
    test("Renders without assets and calls on press fn", () => {
        const mockedOnPress = jest.fn();
        render(<AssetSelectDisplay onPress={mockedOnPress} />);
        const fee = screen.getByText(config.estimatedFee + " " + config.tokenName);
        expect(fee).toBeDefined();
        fireEvent.press(fee);
        expect(mockedOnPress).toHaveBeenCalled();
    });
    test("Renders correctly with an nft", async () => {
        const mockedOnPress = jest.fn();
        const nft = new NftTokenMock();
        const asset = new AssetMock({
            type: AssetType.NFT,
            nft,
        });
        new UseAssetSelectMock({ asset });
        render(<AssetSelectDisplay onPress={mockedOnPress} />);
        await waitFor(() => {
            expect(screen.getByText(nft.metadata.title)).toBeDefined();
        });
    });
    test("Renders correctly with a ft", async () => {
        const mockedOnPress = jest.fn();
        const token = new TokenMock();
        const asset = new AssetMock({
            type: AssetType.FT,
            ft: token,
        });
        new UseAssetSelectMock({ asset });
        render(<AssetSelectDisplay onPress={mockedOnPress} />);
        await waitFor(() => {
            expect(screen.getByText(translate("number", { val: token.balance }) + " " + token.metadata.symbol)).toBeDefined();
        });
    });
    test("Renders correctly with nears", async () => {
        const mockedOnPress = jest.fn();
        new UseAssetSelectMock();
        const {
            balance: { available },
        } = new UseGetBalanceMock();
        render(<AssetSelectDisplay onPress={mockedOnPress} />);
        await waitFor(() => expect(screen.getByText(translate("number", { val: available }) + " " + config.tokenName)).toBeDefined());
    });
});
