import { Transaction } from "@peersyst/ckb-peersyst-sdk";
import { render, SuccessApiCall } from "test-utils";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import { StorageWallet, WalletStorage } from "module/wallet/WalletStorage";
import createUseCreateWalletMock from "mocks/useCreateWalletMock";
import createUseWalletStateMock from "mocks/useWalletState";
import { fireEvent, waitFor } from "@testing-library/react-native";
import Button from "module/common/component/input/Button/Button";
import { CKBSDKService } from "module/common/service/CkbSdkService";

describe("AddWalletModal tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<AddWalletModal title="Add wallet">{() => <></>}</AddWalletModal>);
        expect(screen.getByText("Add wallet"));
    });

    test("Wallet creation is completed successfully", async () => {
        jest.spyOn(CKBSDKService.prototype, "synchronize").mockReturnValue(
            SuccessApiCall({
                addressMap: new Map<string, string>(),
                firstIndexWithoutTxs: 0,
                lastHashBlock: "0x123",
                accountCellsMap: new Map<number, any[]>(),
                accountTransactionMap: new Map<number, Transaction[]>(),
            }),
        );
        const newWallet: StorageWallet = {
            name: "Wallet Name",
            colorIndex: 2,
            mnemonic: ["despair", "creek", "road"],
            index: 2,
        };
        const resetCreateWallet = jest.fn();
        jest.spyOn(UseCreateWallet, "default").mockReturnValue(
            createUseCreateWalletMock({
                state: {
                    name: "Wallet Name",
                    colorIndex: 2,
                    mnemonic: ["despair", "creek", "road"],
                },
                reset: resetCreateWallet,
            }),
        );
        const storeWallet = jest.spyOn(WalletStorage, "addWallet").mockImplementation(() => SuccessApiCall(newWallet));
        const setWalletState = jest.fn();
        jest.spyOn(UseWalletState, "default").mockReturnValue(createUseWalletStateMock({ setState: setWalletState }));
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
