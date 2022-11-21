import { render, SuccessApiCall } from "test-utils";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import { StorageWallet, WalletStorage } from "module/wallet/WalletStorage";
import { fireEvent, waitFor } from "@testing-library/react-native";
import Button from "module/common/component/input/Button/Button";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { UseWalletStateMock, WalletStateMock } from "test-mocks";

describe("AddWalletModal tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<AddWalletModal title="Add wallet">{() => <></>}</AddWalletModal>);
        expect(screen.getByText("Add wallet"));
    });

    test("Wallet creation is completed successfully", async () => {
        const newWallet: StorageWallet = {
            name: "Wallet Name",
            colorIndex: 2,
            mnemonic: MnemonicMocked.split(" "),
            index: 2,
        };
        const resetCreateWallet = jest.fn();
        const state = new WalletStateMock({
            wallets: [
                {
                    name: "Wallet Name",
                    colorIndex: 2,
                    index: 2,
                },
            ],
        });
        new UseWalletStateMock({
            state,
            reset: resetCreateWallet,
        });
        const storeWallet = jest.spyOn(WalletStorage, "addWallet").mockImplementation(() => SuccessApiCall(newWallet));
        const setWalletState = jest.fn();
        new UseWalletStateMock({ setState: setWalletState });

        const handleClose = jest.fn();
        const handleExited = jest.fn();
        const screen = render(
            <AddWalletModal title="Add wallet" onClose={handleClose} onExited={handleExited}>
                {(handleWalletCreation) => <Button onPress={handleWalletCreation}>Add Wallet</Button>}
            </AddWalletModal>,
        );
        fireEvent.press(screen.getByText("Add Wallet"));
        await waitFor(() => expect(storeWallet).toHaveBeenCalled());
        expect(setWalletState).toHaveBeenCalled();
        expect(handleClose).toHaveBeenCalled();
    });
});
