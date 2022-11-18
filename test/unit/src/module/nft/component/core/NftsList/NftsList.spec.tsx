import { render, SuccessApiCall, translate } from "test-utils";
import NftsList from "module/nft/component/core/NftsList/NftsList";
import { waitFor } from "@testing-library/react-native";
import { NftTokensMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("NftsList tests", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseServiceInstanceMock();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const { nfts } = new NftTokensMock();
        jest.spyOn(serviceInstance, "getNfts").mockReturnValue(SuccessApiCall(nfts));
        const screen = render(<NftsList />);
        await waitFor(() => expect(screen.getByText(nfts[0].metadata.title!)));
    });

    test("Renders correctly without transactions", async () => {
        jest.spyOn(serviceInstance, "getNfts").mockReturnValue(SuccessApiCall([]));
        const screen = render(<NftsList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show", { ns: "error" }))));
    });
});
