import AssetAmountTextField from "module/transaction/component/input/AssetAmountTextField/AssetAmountTextField";
import { AssetType } from "module/wallet/wallet.types";
import { AssetMock, TokenMetadataMock, TokenMock, UseGetBalanceMock } from "test-mocks";
import { render, screen, waitFor } from "test-utils";

describe("AssetAmountTextField Test", () => {
    test("Renders nft", () => {
        const asset = new AssetMock({ type: AssetType.NFT });
        render(<AssetAmountTextField asset={asset} placeholder="Enter amount" />);
        const input = screen.getByPlaceholderText("Enter amount");
        expect(input).toBeDefined();
        expect(input.props.value).toBe("1");
    });
    test("Renders ft", () => {
        const metadata = new TokenMetadataMock({ symbol: "PUNKS" });
        const ft = new TokenMock({ balance: "10", metadata });
        const asset = new AssetMock({ type: AssetType.FT, ft });
        render(<AssetAmountTextField asset={asset} placeholder="Enter amount" />);
        expect(screen.getByText("PUNKS")).toBeDefined();
        expect(screen.getByPlaceholderText("Enter amount")).toBeDefined();
    });
    test("Renders NEAR", async () => {
        new UseGetBalanceMock();
        const asset = new AssetMock({ type: AssetType.TOKEN });
        render(<AssetAmountTextField asset={asset} placeholder="Enter amount" />);
        expect(screen.getByPlaceholderText("Enter amount")).toBeDefined();
        await waitFor(() => expect(screen.getByText("NEAR")).toBeDefined());
    });
});
