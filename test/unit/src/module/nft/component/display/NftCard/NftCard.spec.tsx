import { render } from "test-utils";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { nft } from "mocks/nft";

describe("NftCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<NftCard {...nft} />);
        expect(screen.getByText("NFT"));
    });
});
