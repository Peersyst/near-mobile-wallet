import { render, SuccessApiCall } from "test-utils";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import { StorageWallet, WalletStorage } from "module/wallet/WalletStorage";
import createUseCreateWalletMock from "mocks/useCreateWalletMock";

import { fireEvent, waitFor } from "@testing-library/react-native";
import Button from "module/common/component/input/Button/Button";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import synchronizeMock from "mocks/synchronize";
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
        jest.spyOn(CKBSDKService.prototype, "synchronize").mockReturnValue(SuccessApiCall(synchronizeMock) as any);
        const baseNewWallet = {
            name: "Wallet Name",
            colorIndex: 2,
            index: 2,
        };
        const newWallet: StorageWallet = {
            ...baseNewWallet,
            mnemonic: MnemonicMocked.split(" "),
        };

        const state = new WalletStateMock({
            wallets: [baseNewWallet],
        });
        const resetCreateWallet = jest.fn();
        new UseWalletStateMock({
            state,
            reset: resetCreateWallet,
        });
        jest.spyOn(UseCreateWallet, "default").mockReturnValue(
            createUseCreateWalletMock({
                state: newWallet,
                reset: resetCreateWallet,
            }),
        );
        const storeWallet = jest.spyOn(WalletStorage, "addWallet").mockImplementation(() => SuccessApiCall(newWallet));
        const setWalletState = jest.fn();
        new UseWalletStateMock({ setState: setWalletState });
        const handleClose = jest.fn();

        const screen = render(
            <AddWalletModal title="Add wallet" onClose={handleClose} onExited={jest.fn()}>
                {(handleWalletCreation) => <Button onPress={handleWalletCreation}>Add Wallet</Button>}
            </AddWalletModal>,
        );
        fireEvent.press(screen.getByText("Add Wallet"));
        await waitFor(() => expect(storeWallet).toHaveBeenCalled());
        expect(setWalletState).toHaveBeenCalled();
        expect(handleClose).toHaveBeenCalled();
    });
});
