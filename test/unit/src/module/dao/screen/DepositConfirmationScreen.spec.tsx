import { render } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import * as Recoil from "recoil";
import { translate } from "locale";
import { formatAddress } from "@peersyst/react-utils";
import { mockedUseWallet } from "mocks/useWalletState";
import DepositConfirmationScreen from "module/dao/screen/DepositConfirmationScreen/DepositConfirmationScreen";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("DepositConfirmationScreen tests", () => {
    const sdkInstance = new CKBSDKService(MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getAddress").mockReturnValue("0xMockedAddress");
        const mockedWallet = mockedUseWallet.state.wallets[0];
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({
            amount: 1000,
            fee: 0.001,
            senderWalletIndex: mockedWallet.index,
        });

        const screen = render(<DepositConfirmationScreen />);
        expect(screen.getByText("1,000")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("001")).toBeDefined();
        expect(screen.getByText(translate("from") + ":")).toBeDefined();
        expect(screen.getByText(mockedWallet.name + " - " + formatAddress("0xMockedAddress", "middle", 3))).toBeDefined();
    });
});
