import ReceiveCard from "module/transaction/component/display/ReceiveCard/ReceiveCard";
import { fireEvent, render, translate } from "test-utils";
import * as Clipboard from "expo-clipboard";
import * as Genesys from "@peersyst/react-native-components";
import * as UseSelectedWallet from "module/wallet/hook/useSelectedWallet";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { wallet } from "mocks/wallet";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

const ADDRESS_MOCK = "0xMockedAddress";

describe("Test for the receive Card", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    beforeEach(() => {
        jest.spyOn(UseSelectedWallet, "default").mockReturnValue(wallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getAddress").mockReturnValue(ADDRESS_MOCK);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<ReceiveCard />);
        expect(screen.getByText(ADDRESS_MOCK)).toBeDefined();
    });
    test("Copies address correctly", () => {
        const showToast = jest.fn();
        jest.spyOn(Genesys, "useToast").mockReturnValue({ showToast, hideToast: jest.fn(), toastActive: false });
        jest.spyOn(Clipboard, "setString");
        const screen = render(<ReceiveCard />);
        const icon = screen.getByTestId("FilledCopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setString).toHaveBeenCalledWith(ADDRESS_MOCK);
        expect(showToast).toHaveBeenCalledWith(translate("address_copied"), { type: "success" });
    });
    test("Hides modal correctly", () => {
        const hideModal = jest.fn();
        jest.spyOn(Genesys, "useModal").mockReturnValue({ hideModal } as any);
        const screen = render(<ReceiveCard />);
        expect(screen.getByText(ADDRESS_MOCK)).toBeDefined();
        const text = screen.getByText(translate("go_back"));
        expect(text).toBeDefined();
        expect(screen.getByTestId("BackIcon")).toBeDefined();
        fireEvent.press(text);
        expect(hideModal).toHaveBeenCalledWith(ReceiveModal.id);
    });
});
