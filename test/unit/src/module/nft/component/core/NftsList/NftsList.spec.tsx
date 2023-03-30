import { render, translate } from "test-utils";
import NftsList from "module/nft/component/core/NftsList/NftsList";
import { waitFor } from "@testing-library/react-native";
import { NftTokensMock, UseGetNftsMock, UseWalletStateMock } from "test-mocks";

describe("NftsList tests", () => {
    new UseWalletStateMock();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const { nfts } = new NftTokensMock();
        new UseGetNftsMock({ nfts });
        const screen = render(<NftsList />);
        await waitFor(() => expect(screen.getByText(nfts[0].metadata.title!)));
    });

    test("Renders correctly without nfts", async () => {
        new UseGetNftsMock({ nfts: [] });
        const screen = render(<NftsList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_nfts", { ns: "error" }))));
    });
});
