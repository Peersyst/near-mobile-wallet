import * as UseWallet from "module/wallet/hook/useWallet";
import * as GetNfts from "module/nft/mock/getNfts";
import { render, SuccessApiCall } from "test-utils";
import { nfts } from "mocks/nft";
import NftsList from "module/nft/component/core/NftsList/NftsList";
import { waitFor } from "@testing-library/react-native";

describe("NftsList tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWallet, "default").mockReturnValue({
            state: {
                hasWallet: true,
                isAuthenticated: true,
                isFirstTime: false,
                cells: [{ address: "address", balance: "1", name: "Name" }],
                selectedAccount: 0,
            },
            setAuthenticated: jest.fn(),
            setCells: jest.fn(),
            setSelectedAccount: jest.fn(),
            setState: jest.fn(),
            reset: jest.fn(),
        });
        jest.spyOn(GetNfts, "default").mockReturnValue(SuccessApiCall(nfts));

        const screen = render(<NftsList />);

        await waitFor(() => expect(screen.getByText("NFT0")));
        expect(screen.getByText("NFT1"));
        expect(screen.getByText("NFT2"));
    });
});
