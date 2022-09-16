import * as UseWalletState from "module/wallet/hook/useWalletState";
import { render, SuccessApiCall, translate } from "test-utils";
import { nfts } from "mocks/nft";
import NftsList from "module/nft/component/core/NftsList/NftsList";
import { waitFor } from "@testing-library/react-native";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("NftsList tests", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getNfts").mockReturnValue(SuccessApiCall(nfts));

        const screen = render(<NftsList />);

        await waitFor(() => expect(screen.getByText("NFT0")));
        expect(screen.getByText("NFT1"));
        expect(screen.getByText("NFT2"));
    });

    test("Renders correctly without transactions", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getNfts").mockReturnValue(SuccessApiCall([]));
        const screen = render(<NftsList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show", { ns: "error" }))));
    });
});
