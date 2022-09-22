import createUseWalletStateMock from "mocks/useWalletState";
import * as UseWalletStateMock from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { render, SuccessApiCall, wait, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";

describe("WalletBackup", () => {
    jest.setTimeout(10000);
    test("Mnemonic is shown and picked correctly", async () => {
        const useWalletStateMock = createUseWalletStateMock();
        jest.spyOn(UseWalletStateMock, "default").mockReturnValue(useWalletStateMock);
        const mnemonic = ["Pizza", "Fries", "Ball", "Car"];
        jest.spyOn(WalletStorage, "getMnemonic").mockReturnValue(SuccessApiCall(mnemonic));
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));

        const screen = render(<WalletsBackupModal />);

        fireEvent.press(screen.getByText(translate("back_up_your_wallets")));
        await wait(5200);
        fireEvent.press(screen.getByText(translate("back_up_now")));
        fireEvent.press(screen.getByText(useWalletStateMock.state.wallets[0].name));
        for (let i = 1; i < 5; i++) fireEvent.press(screen.getByText(i.toString()));
        await waitFor(() => expect(screen.getByText(translate("keep_this_safe"))).toBeDefined());
        fireEvent.press(screen.getByText(translate("close")));
    });
});
