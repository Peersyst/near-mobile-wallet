import * as UseWalletState from "module/wallet/hook/useWalletState";
import { render } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";

describe("WalletSelector tests", () => {
    const sdkInstance = new CKBSDKService("");

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: BigInt(1),
            occupiedBalance: BigInt(0),
            freeBalance: BigInt(1),
        });

        const screen = render(<WalletSelector />);
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toHaveLength(2);
        await waitFor(() => expect(screen.getAllByText("1")).toHaveLength(3));
        expect(screen.getAllByText("00")).toHaveLength(3);
        expect(screen.getAllByText("CKB")).toHaveLength(3);
    });
});
