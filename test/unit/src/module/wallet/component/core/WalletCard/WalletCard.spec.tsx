import { translate } from "locale";
import { render } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { wallet } from "mocks/wallet";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import * as useCkbConversion from "module/common/hook/useCkbConversion";
import * as Recoil from "recoil";
import * as ExpoHaptics from "expo-haptics";

describe("WalletCard tests", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 10400,
        });
    });

    test("Renders correctly", async () => {
        const screen = render(<WalletCard wallet={wallet} />);
        /**Account header */
        expect(screen.getByText(mockedUseWallet.state.wallets[0].name)).toBeDefined();
        expect(screen.getByTestId("EditIcon")).toBeDefined();
        expect(screen.getByTestId("CopyIcon")).toBeDefined();

        /**Account Balance */
        await waitFor(() => expect(screen.getByText("10,400")).toBeDefined());
        expect(screen.getByText("000000")).toBeDefined();

        /**Account Buttons */
        expect(screen.getByText(translate("send"))).toBeDefined();
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        expect(screen.getByText(translate("receive"))).toBeDefined();
    });

    test("Change the currency when the user clicks on the balance", async () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ fiat: "eur" });
        jest.spyOn(useCkbConversion, "default").mockReturnValue({ value: 10, convertBalance: jest.fn() });
        const mockedVibrate = jest.fn();
        jest.spyOn(ExpoHaptics, "impactAsync").mockImplementation(mockedVibrate);
        const screen = render(<WalletCard wallet={wallet} />);
        /**Account Balance */
        await waitFor(() => expect(screen.getByText("10,400")).toBeDefined());
        const text = screen.getByText("10,400");
        fireEvent.press(text);
        await waitFor(() => expect(screen.getByText("10")).toBeDefined());
        expect(mockedVibrate).toHaveBeenCalled();
    });
});
