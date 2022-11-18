import { formatBalance, render, translate } from "test-utils";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { NftTokenMock } from "test-mocks";

describe("NftCard tests", () => {
    test("Renders correctly", () => {
        const nft = new NftTokenMock();
        const screen = render(<NftCard nft={nft} />);
        expect(screen.getByText(nft.metadata.title!));
        expect(screen.getByText(nft.owner_id));
        expect(screen.getByText(translate("boughtFor")));
        expect(screen.getByText(formatBalance(500, { units: "token", numberFormatOptions: { maximumFractionDigits: 2 } })));
    });
});
