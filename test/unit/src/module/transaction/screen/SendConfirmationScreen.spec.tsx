import { render } from "test-utils";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import * as Recoil from "recoil";
import { translate } from "locale";
import { formatAddress } from "@peersyst/react-utils";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";

describe("SendConfirmationScreen tests", () => {
    const sdkInstance = new CKBSDKService(MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getAddress").mockReturnValue("0xMockedAddress");
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({
            amount: convertShannonsToCKB(1000).toString(),
            fee: convertShannonsToCKB(10).toString(),
            senderWalletIndex: mockedUseWallet.state.wallets[0].index,
            receiverAddress: "receiver_address",
            message: "Send message",
        });

        const screen = render(<SendConfirmationScreen />);
        expect(screen.getByText("1,000")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();

        expect(screen.getByText(translate("from") + ":")).toBeDefined();
        expect(
            screen.getByText(mockedUseWallet.state.wallets[0].name + " - " + formatAddress("0xMockedAddress", "middle", 3)),
        ).toBeDefined();
        expect(screen.getByText(translate("to") + ":")).toBeDefined();
        expect(screen.getByText("recei...ess")).toBeDefined();
        expect(screen.getByText(translate("message") + ":")).toBeDefined();
        expect(screen.getByText("Send message")).toBeDefined();
    });
});
