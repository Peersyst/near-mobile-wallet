import { formatBalance, render, translate } from "test-utils";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { tempNft } from "mocks/nft";

describe("NftCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<NftCard nft={tempNft} />);
        expect(screen.getByText(tempNft.metadata.title!));
        expect(screen.getByText(tempNft.contract_id));
        expect(screen.getByText(translate("boughtFor")));
        expect(screen.getByText(formatBalance({ balance: tempNft.events[0].price, units: "token" })));
    });
});
