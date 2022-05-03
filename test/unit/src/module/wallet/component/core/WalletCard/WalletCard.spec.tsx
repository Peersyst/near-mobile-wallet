import { translate } from "locale";
import { render } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { wallet } from "mocks/wallet";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("WalletCard tests", () => {
    const sdkInstance = new CKBSDKService(MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 10400,
        });
        const screen = render(<WalletCard wallet={wallet} />);

        /**Account header */
        expect(screen.getByText(mockedUseWallet.state.wallets[0].name)).toBeDefined();
        expect(screen.getByTestId("EditIcon")).toBeDefined();
        expect(screen.getByTestId("CopyIcon")).toBeDefined();

        /**Account Balance */
        await waitFor(() => expect(screen.getByText("10,400")).toBeDefined());
        expect(screen.getByText("000000")).toBeDefined();
        expect(screen.getByText("ckb")).toBeDefined();

        /**Account Buttons */
        expect(screen.getByText(translate("send"))).toBeDefined();
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        expect(screen.getByText(translate("receive"))).toBeDefined();
    });
});
