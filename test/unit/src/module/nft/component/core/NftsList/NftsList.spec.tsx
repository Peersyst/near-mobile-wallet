import * as UseWallet from "module/wallet/hook/useWallet";
import * as GetNfts from "module/nft/mock/getNfts";
import { render, SuccessApiCall } from "test-utils";
import { nfts } from "mocks/nft";
import NftsList from "module/nft/component/core/NftsList/NftsList";
import { waitFor } from "@testing-library/react-native";
import { mockedUseWallet } from "mocks/useWallet";
import { translate } from "locale";

describe("NftsList tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWallet, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetNfts, "default").mockReturnValue(SuccessApiCall(nfts));

        const screen = render(<NftsList />);

        await waitFor(() => expect(screen.getByText("NFT0")));
        expect(screen.getByText("NFT1"));
        expect(screen.getByText("NFT2"));
    });

    test("Renders correctly without transactions", async () => {
        jest.spyOn(UseWallet, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetNfts, "default").mockReturnValue(SuccessApiCall([]));
        const screen = render(<NftsList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_nfts"))));
    });
});
