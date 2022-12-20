import WalletPrivateKeyBackup from "module/wallet/component/core/WalletsBackupModal/WalletPrivateKeyBackup/WalletPrivateKeyBackup";
import { WalletStorage } from "module/wallet/WalletStorage";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";

describe("WalletPrivateKeyBackup tests", () => {
    test("Renders correctly", async () => {
        const handleClose = jest.fn();
        jest.spyOn(WalletStorage, "getWalletPrivateKey").mockResolvedValue("private_key");
        render(<WalletPrivateKeyBackup onClose={handleClose} />);
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
        await waitFor(() => expect(screen.getByText(translate("keep_this_safe"))).toBeDefined());
        expect(screen.getByText("private_key")).toBeDefined();
        fireEvent.press(screen.getByText(translate("close")));
        expect(handleClose).toHaveBeenCalled();
    });
});
