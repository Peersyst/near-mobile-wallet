import { WalletStorage } from "module/wallet/WalletStorage";
import { render, SuccessApiCall } from "test-utils";
import WalletMnemonicBackup from "module/wallet/component/core/WalletsBackupModal/WalletMnemonicBackup/WalletMnemonicBackup";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { translate } from "locale";

const mnemonic = ["Pizza", "Fries", "Ball", "Car"];

describe("WalletMnemonicBackup tests", () => {
    test("Renders correctly", async () => {
        jest.spyOn(WalletStorage, "getMnemonic").mockReturnValue(SuccessApiCall(mnemonic));
        const handleSuccess = jest.fn();

        const screen = render(<WalletMnemonicBackup walletIndex={0} onSuccess={handleSuccess} />);

        await waitFor(() => expect(screen.getByText(translate("keep_this_safe"))).toBeDefined());
        mnemonic.forEach((word) => expect(screen.getByText(word)).toBeDefined());
        fireEvent.press(screen.getByText(translate("next")));
        mnemonic.forEach((word) => fireEvent.press(screen.getByText(word)));
        expect(handleSuccess).toHaveBeenCalled();
    });
});
