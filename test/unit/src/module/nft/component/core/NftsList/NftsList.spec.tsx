import { render, SuccessApiCall } from "test-utils";
import { tempNft } from "mocks/nft";
import NftsList from "module/nft/component/core/NftsList/NftsList";
import { waitFor } from "@testing-library/react-native";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("NftsList tests", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseGetServiceInstanceMock();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(serviceInstance, "getNfts").mockReturnValue(SuccessApiCall([tempNft] as any));
        const screen = render(<NftsList />);
        await waitFor(() => expect(screen.getByText(tempNft.metadata.title!)));
    });

    // IGNORED WHILE MOCKED
    /* test("Renders correctly without transactions", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getNfts").mockReturnValue(SuccessApiCall([]));
        const screen = render(<NftsList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show", { ns: "error" }))));
    });*/
});
