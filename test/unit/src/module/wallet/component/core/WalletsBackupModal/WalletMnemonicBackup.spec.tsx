import { WalletStorage } from "module/wallet/WalletStorage";
import { render, translate } from "test-utils";
import WalletMnemonicBackup from "module/wallet/component/core/WalletsBackupModal/WalletMnemonicBackup/WalletMnemonicBackup";
import { fireEvent, waitFor, screen } from "@testing-library/react-native";

const mnemonic: string[] = ["Pizza", "Fries", "Ball", "Car"];

describe("WalletMnemonicBackup tests", () => {
    test("Renders correctly", async () => {
        jest.spyOn(WalletStorage, "getMnemonic").mockResolvedValue(mnemonic.join(" "));
        const handleClose = jest.fn();
        render(<WalletMnemonicBackup onClose={handleClose} />);
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
        await waitFor(() => expect(screen.getByText(translate("keep_this_safe"))).toBeDefined());
        mnemonic.forEach((word) => expect(screen.getByText(word)).toBeDefined());
        fireEvent.press(screen.getByText(translate("close")));
        expect(handleClose).toHaveBeenCalled();
    });
});
