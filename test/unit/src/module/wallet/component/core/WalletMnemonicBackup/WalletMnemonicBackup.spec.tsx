import { WalletStorage } from "module/wallet/WalletStorage";
import { render, SuccessApiCall, translate } from "test-utils";
import WalletMnemonicBackup from "module/wallet/component/core/WalletsBackupModal/WalletMnemonicBackup/WalletMnemonicBackup";
import { fireEvent, waitFor } from "@testing-library/react-native";

const mnemonic = ["Pizza", "Fries", "Ball", "Car"];

describe("WalletMnemonicBackup tests", () => {
    test("Renders correctly", async () => {
        jest.spyOn(WalletStorage, "getMnemonic").mockReturnValue(SuccessApiCall(mnemonic));
        const handleClose = jest.fn();

        const screen = render(<WalletMnemonicBackup walletIndex={0} onClose={handleClose} />);

        await waitFor(() => expect(screen.getByText(translate("keep_this_safe"))).toBeDefined());
        mnemonic.forEach((word) => expect(screen.getByText(word)).toBeDefined());
        fireEvent.press(screen.getByText(translate("close")));
        expect(handleClose).toHaveBeenCalled();
    });
});
